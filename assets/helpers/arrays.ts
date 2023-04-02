
// This should be a good replacement for array.push(...[])
export const joinArray = (item: any | any[], ...join_items: any[]): any[] => {
  if(item === undefined) item = [];

  let items = item;

  if(!Array.isArray(items))
    items = [ items ];

  for(let i = 0, len = join_items.length; i < len; i++) {
    let join_item = join_items[i];
    if(join_item === undefined) join_item = [];
    if(!Array.isArray(join_item)) join_item = [ join_item ];

    for(let i2 = 0, len2 = join_item.length; i2 < len2; i2++) {
      items.push(join_items[i][i2]);
    }
  }

  return items;
};

// Join items but returns the array instead of editing it in place.
export const toArray = (item: any | any[], ...join_items: any[]): any[] => {
  if(item === undefined) item = [];

  let items;

  if(!Array.isArray(item))
    items = [ item ];
  else
    items = item.slice(0);

  joinArray(items, ...join_items);

  return items;
};
