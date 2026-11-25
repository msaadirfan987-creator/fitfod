import { supabase } from '../config/supabase.js';

/**
 * Fetch all fitness categories ordered by sort_order ascending.
 */
export async function getCategories(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, subcategories, sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      return next(Object.assign(new Error(error.message), { status: 500 }));
    }

    return res.json(data ?? []);
  } catch (err) {
    return next(err);
  }
}
