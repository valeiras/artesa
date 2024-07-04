```markdown
# Artesa: Next App for Product Traceability

Artesa is a web application designed to facilitate product traceability, enabling businesses to track and manage their supply chain more efficiently.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [To-Do List](#to-do-list)

## Features

- User authentication and authorization
- Product registration with barcode scanning
- Real-time tracking of product location and status
- Data visualization and reporting
- Integration with external systems (e.g., ERP, IoT devices)

## Getting Started

1. Clone the repository:
```

git clone https://github.com/valeiras/artesa.git

```

2. Install dependencies:
```

cd artesa
npm install

```

3. Set up environment variables:
- Create a `.env.local` file in the root directory of your project.
- Set the environment variables required to connect with your DB and your Clerk account-

4. Run the development server:
```

npm run dev

```

## Technologies Used

- Next.js
- Shadcn/ui
- Supabase
- Clerk

## To-Do List

- Create a button to populate the DB with random data
- Use pagination to lighten the request to the database
- Add "updated_at" column and order records by this field
- Add a multiple selector to the data table
- Add info on hover
- Improve the recipe update mechanism: avoid deletion and subsequent creation of the whole recipe
- Remove the selected ingredients from the ingredients list
```

This README provides a high-level overview of the Artesa project, including its features, getting started instructions, technologies used, and a list of pending tasks.
