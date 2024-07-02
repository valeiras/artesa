CREATE TYPE public.unit AS ENUM('unit', 'box', 'jar', 'g', 'mg', 'kg', 'l', 'dl', 'cl', 'ml');
CREATE TYPE public.role AS ENUM('minimum', 'limited', 'full');

CREATE TABLE public.clients(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  address text,
  email text,
  phone text,
  comments text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_client_name_per_user UNIQUE (user_id, name)
);
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.suppliers(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  address text,
  email text,
  phone text,
  comments text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_supplier_name_per_user UNIQUE (user_id, name)
);
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.commodities(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  external_id text,
  unit unit NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_commodity_name_per_user UNIQUE (user_id, name)
);
ALTER TABLE commodities ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.commodity_batches(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  commodity_id bigint NOT NULL,
  supplier_id bigint NOT NULL,
  external_id text NOT NULL,
  initial_amount double precision NOT NULL,
  date date NOT NULL,
  comments text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_commodity_batch_external_id_per_user UNIQUE (user_id, external_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (commodity_id) REFERENCES commodities(id)
);
ALTER TABLE commodity_batches ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.products(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  unit unit NOT NULL,
  external_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_product_name_per_user UNIQUE (user_id, name)
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.product_ingredients(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id bigint NOT NULL,
  product_ingredient_id bigint ,
  commodity_ingredient_id bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT product_ingredient_is_product_or_commodity
  CHECK(
    (product_ingredient_id IS NULL) 
    <> 
    (commodity_ingredient_id IS NULL)
  ),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (product_ingredient_id) REFERENCES products(id),
  FOREIGN KEY (commodity_ingredient_id) REFERENCES commodities(id)
);
ALTER TABLE product_ingredients ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.product_batches(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id bigint NOT NULL,
  external_id text NOT NULL,
  initial_amount double precision NOT NULL,
  date date NOT NULL,
  comments text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT unique_product_batch_external_id_per_user UNIQUE (user_id, external_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
ALTER TABLE product_batches ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.product_batch_ingredients(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_batch_id bigint NOT NULL,
  product_ingredient_batch_id bigint ,
  commodity_ingredient_batch_id bigint,
  used_amount double precision NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id(),
  CONSTRAINT product_ingredient_batch_is_product_or_commodity
  CHECK (
    (product_ingredient_batch_id IS NULL) 
    <> 
    (commodity_ingredient_batch_id IS NULL)
  ),
  FOREIGN KEY (product_batch_id) REFERENCES product_batches(id),
  FOREIGN KEY (product_ingredient_batch_id) REFERENCES product_batches(id),
  FOREIGN KEY (commodity_ingredient_batch_id) REFERENCES commodity_batches(id)
);
ALTER TABLE product_batch_ingredients ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.sales(
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


CREATE table public.sale_ingredients(
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

CREATE TABLE public.user_roles(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  created_at timestamp with time zone DEFAULT now(),
  user_id text NOT NULL DEFAULT requesting_user_id() UNIQUE,
  role role
);
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;