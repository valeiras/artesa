CREATE table public.sales(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  client_id bigint NOT NULL,
  comments text,
  date date NOT NULL,   
  created_at timestamp with time zone DEFAULT now(),
  external_id text,
  user_id text NOT NULL DEFAULT requesting_user_id(),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can perform CRUD operations on their own sales"
ON "public"."sales"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

TE table public.sale_ingredients(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sale_id bigint NOT NULL,
  commodity_batch_id bigint,
  product_batch_id bigint,
  sold_amount double precision NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  FOREIGN KEY (sale_id) REFERENCES sales(id),
  FOREIGN KEY (commodity_batch_id) REFERENCES commodity_batches(id),
  FOREIGN KEY (product_batch_id) REFERENCES product_batches(id),
  CONSTRAINT sold_product_is_product_or_commodity
  CHECK (
    (product_batch_id IS NULL)
    <>
    (commodity_batch_id IS NULL)
  )
);

ALTER TABLE sale_ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can perform CRUD operations on their own sale ingredients"
ON "public"."sale_ingredients"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

