export interface Status {
  category: string;
  active: boolean;
  class: string;
}

export const Buttons: Status[] = [
  {
    category: 'All categories',
    active: true,
    class: 'btn btn-outline-light me-2 xd',
  },
  {
    category: "Men's clothing",
    active: false,
    class: 'btn btn-outline-light me-2',
  },
  {
    category: "Women's clothing",
    active: false,
    class: 'btn btn-outline-light me-2',
  },
  {
    category: 'Jewelery',
    active: false,
    class: 'btn btn-outline-light me-2',
  },
  {
    category: 'Electronics',
    active: false,
    class: 'btn btn-outline-light me-2',
  },
];
