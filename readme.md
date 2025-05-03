# Bluestock 📈

Bluestock is a web application that displays detailed information about company IPOs (Initial Public Offerings). The platform helps users track upcoming, ongoing, and past IPOs, along with company data and documents.

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Headless UI](https://headlessui.dev/) (or custom components)

### Backend
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT Auth](https://jwt.io/) or Django built-in authentication

## 🔧 Features

- 🏢 Company listings with details
- 📅 IPO information (upcoming, ongoing, closed)
- 📎 Document uploads and downloads (with cascade deletion)
- 🔐 User authentication (JWT or Django Auth)
- 📱 Responsive design
## 📁 Project Structure

```bash
bluestock/
├── backend/                     # Django backend
│   ├── bluestock/               # Django project settings (settings.py, urls.py, wsgi.py)
│   ├── api/                     # Django app for IPOs, Companies, Documents
│   │   ├── models.py            # Database models
│   │   ├── views.py             # API views
│   │   ├── serializers.py       # DRF serializers
│   │   ├── urls.py              # API routing
│   └── manage.py                # Django project entry point
│
├── frontend/                    # React frontend using Vite
│   ├── src/
│   │   ├── pages/               # Route-level components (Home.jsx, IPOs.jsx, etc.)
│   │   ├── components/          # Reusable UI components (Navbar.jsx, Card.jsx)
│   │   ├── App.jsx              # Root app component with routes
│   │   └── main.jsx             # Vite entry point
│   ├── index.html               # HTML template
│   └── tailwind.config.js       # Tailwind configuration
│
├── .gitignore                   # Git ignored files
├── README.md                    # Project readme
├── requirements.txt             # Python dependencies
└── package.json                 # Node.js dependencies (frontend)
```





## 🔧 Backend Setup

```bash
# Step 1: Navigate to backend
cd backend

# Step 2: Set up virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# Step 3: Install dependencies
pip install -r requirements.txt

# Step 4: Configure database (in settings.py and .env if needed)

# Step 5: Run migrations
python manage.py migrate

# Step 6: Start server
python manage.py runserver
```
## Frontend Setup
```bash
# Step 1: Navigate to frontend
cd frontend

# Step 2: Install dependencies
npm install

# Step 3: Start development server
npm run dev

