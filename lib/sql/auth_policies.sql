CREATE POLICY "Users can perform CRUD operations on their own clients"
ON "public"."clients"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own suppliers"
ON "public"."suppliers"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own products"
ON "public"."products"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own commodities"
ON "public"."commodities"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own commodity batches"
ON "public"."commodity_batches"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own product ingredients"
ON "public"."product_ingredients"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own product batches"
ON "public"."product_batches"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own product batch ingredients"
ON "public"."product_batch_ingredients"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own sales"
ON "public"."sales"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can perform CRUD operations on their own sale ingredients"
ON "public"."sale_ingredients"
AS PERMISSIVE
for ALL
to public
using (
    user_id = requesting_user_id()
);

CREATE POLICY "Users can read their own role"
ON "public"."user_roles"
AS PERMISSIVE
for SELECT
to public
using (
    user_id = requesting_user_id()
);