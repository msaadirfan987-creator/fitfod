import { supabase } from '../config/supabase.js';

const EXPERT_COLUMNS =
  'id, category_id, rank, name, slug, sub_category, books, credentials, social_proof, podcast_status, website, instagram, source';

/**
 * Fetch experts optionally filtered by category slug, ordered by rank ascending.
 */
export async function getExperts(req, res, next) {
  try {
    const categorySlug = typeof req.query.category === 'string' ? req.query.category.trim() : '';

    let query = supabase
      .from('experts')
      .select(
        categorySlug
          ? `${EXPERT_COLUMNS}, categories!inner(id, name, slug)`
          : `${EXPERT_COLUMNS}, categories(id, name, slug)`
      )
      .order('rank', { ascending: true });

    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug);
    }

    const { data, error } = await query;

    if (error) {
      return next(Object.assign(new Error(error.message), { status: 500 }));
    }

    return res.json(data ?? []);
  } catch (err) {
    return next(err);
  }
}

/**
 * Fetch a single expert by slug.
 */
export async function getExpertBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const { data, error } = await supabase
      .from('experts')
      .select(`${EXPERT_COLUMNS}, categories(id, name, slug)`)
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      return next(Object.assign(new Error(error.message), { status: 500 }));
    }

    if (!data) {
      return res.status(404).json({ error: 'Expert not found' });
    }

    return res.json(data);
  } catch (err) {
    return next(err);
  }
}
