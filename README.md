# 🛍️ Modern E-Commerce Mobile App (React Native & Expo)

ეს არის თანამედროვე მობილური აპლიკაცია, აგებული **React Native**-ისა და **Expo Router**-ის გამოყენებით. აპლიკაცია მოიცავს პროდუქტების დათვალიერების, კალათაში დამატების, ფავორიტების მართვისა და ავტორიზაციის სრულ ფუნქციონალს.

---

## ✨ ძირითადი ფუნქციები (Features)

- **🔐 სრული ავტორიზაცია:** ლოგინი და რეგისტრაცია `React Hook Form` და `Yup` ვალიდაციით.
- **🛒 კალათის მართვა:** პროდუქტების დამატება, რაოდენობის შეცვლა და წაშლა (გამოყენებულია Context API).
- **❤️ ფავორიტების სისტემა:** ნივთების „დაგულება“ და შენახვა მუდმივ მეხსიერებაში.
- **📦 პროდუქტების კატალოგი:** მონაცემების დინამიური წამოღება `FakeStore API`-დან.
- **💾 მუდმივი მეხსიერება:** `AsyncStorage`-ის საშუალებით მონაცემები (კალათა, ფავორიტები, პროფილი) არ იკარგება აპლიკაციის დახურვისას.
- **📱 ადაპტიური დიზაინი:** სუფთა და თანამედროვე UI, რომელიც მორგებულია როგორც iOS, ისე Android პლატფორმაზე.

---

## 🛠️ გამოყენებული ტექნოლოგიები (Tech Stack)

- **Framework:** [React Native](https://reactnative.dev/) (Expo)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management:** React Context API
- **Validation:** Yup & React Hook Form
- **Icons:** Expo Vector Icons (Ionicons)
- **Storage:** AsyncStorage

---

## 📂 პროექტის სტრუქტურა (Project Structure)

```text
├── app/                  # ნავიგაციის გვერდები (Tabs, Login, Register, Details)
├── components/           # reusable კომპონენტები (InputField, ProductCard და ა.შ.)
├── context/              # Global State (CartContext, FavoritesContext)
├── schemas/              # ვალიდაციის სქემები (Yup)
└── assets/               # სურათები და ფონტები
```
