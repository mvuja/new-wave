# New Wave

A feature-rich, frontend-only e-commerce application built with React and Sass. Powered by the [DummyJSON API](https://dummyjson.com) for products and authentication. All state is managed with Zustand and persisted via localStorage.

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm v8+

### Installation

```bash
git clone https://github.com/your-username/new-wave.git
cd new-wave
npm install
```

### Running the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
```

Outputs an optimized build to the `/build` folder.

---

## Authentication

Authentication is handled entirely on the frontend using the [DummyJSON Auth API](https://dummyjson.com/docs/auth).

- Login is **optional** — the store is fully accessible without an account
- Click **Login** in the header to open the login modal
- On successful login, the access token and user data are stored in `localStorage` and restored on page refresh
- Logout clears all auth state and localStorage

### Test credentials

Use any user from [https://dummyjson.com/users](https://dummyjson.com/users). For example:

| Username   | Password       |
|------------|----------------|
| `emilys`   | `emilyspass`   |
| `michaelw` | `michaelwpass` |

> You can find a full list of test users at [https://dummyjson.com/users](https://dummyjson.com/users).

---

## 🛒 Features

- **Open storefront** — browse, search, filter, and view products with no login required
- **Product detail pages** — SEO-friendly slug-based URLs (e.g. `/product/apple-iphone-15`)
- **Search** — debounced live search via DummyJSON `/products/search`
- **Category filter** — fetches all categories and filters products by category
- **Sorting** — sort by price (asc/desc) or title
- **Pagination** — next/previous with automatic scroll-to-top
- **Cart** — add, remove, update quantity; persisted in localStorage for all users
- **Checkout gate** — login is prompted only when the user clicks Checkout
- **Skeleton loaders** — shown while products are loading
- **Error & empty states** — graceful fallback UI
- **Responsive design** — mobile-friendly layout with SCSS

---

## 📦 Tech Stack & Libraries

| Library                                     | Version | Purpose                         |
|---------------------------------------------|---------|---------------------------------|
| [React](https://react.dev)                  | ^18     | UI framework                    |
| [React Router DOM](https://reactrouter.com) | 5.3.0   | Client-side routing             |
| [Zustand](https://zustand-demo.pmnd.rs)     | ^5      | Global state management         |
| [Swiper](https://swiperjs.com)              | ^12     | Product image carousel          |
| [Sass](https://sass-lang.com)               | ^1.49   | CSS preprocessor                |
| [DummyJSON](https://dummyjson.com)          | —       | Mock REST API (products + auth) |

---

## 🔗 API Reference (DummyJSON)

| Endpoint                       | Usage                             |
|--------------------------------|-----------------------------------|
| `POST /auth/login`             | Authenticate user, receive tokens |
| `GET /auth/me`                 | Fetch current user with token     |
| `GET /products`                | Fetch paginated products          |
| `GET /products/search?q=`      | Search products                   |
| `GET /products/categories`     | Fetch all categories              |
| `GET /products/category/:slug` | Products by category              |

---

## 💾 localStorage Keys

| Key            | Contents                          |
|----------------|-----------------------------------|
| `auth-storage` | Zustand auth state (user, tokens) |
| `cart-storage` | Zustand cart items                |