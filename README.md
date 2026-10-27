# Commonplace

A personal reading notebook: sources (books, articles, podcasts), quotes with tags, notes, Chicago citations, and PDF export. Stored in Supabase, hosted on Vercel, one login.

## Setup (about 15 minutes, once)

### 1. Database
1. Create a new project at supabase.com.
2. Open **SQL Editor > New query**, paste all of `supabase/setup.sql`, and click **Run**.
3. Go to **Authentication > Users > Add user > Create new user**. Enter your email and a password, and check **Auto Confirm User**. This is your login.
4. Go to **Authentication > Sign In / Providers** and turn off **Allow new users to sign up**, so nobody else can make an account.
5. Go to **Project Settings > API** (or **Data API**) and copy the **Project URL** and the **anon public** key.

### 2. Put the code on GitHub
Create a new private repo and push this folder to it:
```
cd commonplace
git init && git add . && git commit -m "Commonplace"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/commonplace.git
git push -u origin main
```

### 3. Host it on Vercel
1. At vercel.com, **Add New > Project**, and import the repo. Vercel detects Vite on its own.
2. Before deploying, open **Environment Variables** and add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key
3. Click **Deploy**. Bookmark the address it gives you on both computers.

### Running it on your own machine (optional)
```
cp .env.example .env    # then fill in the two values
npm install
npm run dev
```

## Using it

- **Q** anywhere: add a quote. Pick a source or create one, paste, add a page and tags, save. "Save and add another" keeps the source picked.
- **/** jumps to search. Plain words search quotes, notes, and sources. `#privacy` finds quotes with that tag. Combine them: `#power consent`. Tags with spaces: `#"civic tech"`.
- Click any tag in the left rail to search by it.
- On a source page: notes on the left, quotes on the right. Click a tag above the quotes to filter them.
- Each quote has **Copy footnote** and **Copy short footnote**, with the page already in. The citation bar at the top copies the bibliography entry. Italics come through when you paste into Word or Google Docs.
- **Export PDF** on a source page, or **Export quotes as PDF** on any search, opens the print dialog. Choose **Save as PDF**.

### Citations
Chicago notes and bibliography, 18th edition. Authors go in as `Last, First; Last, First`. Articles with a volume number are formatted as journal articles; without one, as magazine or web articles. If an automatic citation is off, use **Edit source > Edit by hand**. Wrap italics in `*asterisks*`.
