# Linor: The Next-Generation AI Receptionist

Welcome to the **Linor** monorepo! Linor is a powerful, production-ready AI Receptionist platform designed to seamlessly integrate into any website. It bridges the gap between businesses and their customers by providing a 24/7 intelligent, conversational AI capable of handling inquiries, booking appointments, and offering voice-enabled interactions.

<p align="center">
  <img width="1033" height="489" alt="image" src="https://github.com/user-attachments/assets/94e4e194-88df-4c68-b595-9b9506ae95c9" />
</p>


---

## 🌟 Why Linor is Worthy

In today's fast-paced digital landscape, customer experience is everything. Linor stands out as an exceptional solution for modern businesses because it is:

1. **Seamlessly Embeddable**: With a tiny (~15-25 KB gzipped) widget footprint and complete CSS isolation via Shadow DOM, Linor embeds flawlessly into any website using just a single `<script>` tag. No styling conflicts, no integration headaches.
2. **Highly Scalable & Resilient**: Built on a robust microservices architecture, Linor separates concerns into independent services (Auth, Chat, Appointments, FAQs, and Tenant). This ensures high availability, easy horizontal scaling, and fault tolerance.
3. **Multi-Tenant Ready**: Designed with SaaS in mind, Linor securely manages multiple businesses (tenants) under the hood. Each tenant gets isolated configurations, unique API keys, and custom branding for their widget.
4. **Action-Oriented AI**: Linor doesn't just chat; it *acts*. Integrated directly with our Appointment and FAQ microservices, the AI can check availability, book meetings, and resolve common customer queries instantly without human intervention.
5. **Rich Media & Accessibility**: Linor goes beyond text. It features Voice & TTS (Text-to-Speech) capabilities with sound output, ensuring an accessible and engaging experience for all users. The UI is built with ARIA support and keyboard navigation from the ground up.

---

## 🏗️ How It Works (Architecture)

Linor operates on a dual-layer architecture: a lightweight Frontend Widget and a robust Backend Microservices ecosystem.

### 1. The Frontend (`/chat-widget`)
A vanilla JavaScript UI component that clients embed on their websites.
- **Shadow DOM Isolation**: Guarantees that host website styles never break the widget, and widget styles never leak into the host.
- **Reactive State Store**: Uses a tiny pub/sub pattern without the bloat of external UI frameworks.
- **Resilient API Client**: Built-in exponential backoff, retry logic, and session persistence (using `localStorage` with a TTL).
- **Customizable**: Tenants can customize the bot's name, primary color, welcome message, and avatar via data attributes or programmatic initialization.

### 2. The Microservices Backend (`/Microservices`)
The backend is split into specialized Node.js/Express services to handle distinct domains:

- **Auth Service (`/AUTH`)**: Handles secure authentication, authorization, and session management.
- **Tenant Service (`/tenant`)**: Manages tenant configurations, API key generation/hashing, and proxy validation. Ensure each widget request is authorized.
- **Chat Service (`/Chat`)**: The core AI engine. Interfaces with LLMs (like OpenAI/Google Gen AI), manages conversation history, context, and intelligent prompt routing.
- **Appointment Service (`/appointment`)**: Manages scheduling logic, slot availability, and booking persistence. Handles potential conflicts gracefully.
- **FAQ Service (`/faqs`)**: Serves a knowledge base tailored to each tenant, enabling the AI to answer specific business questions accurately.

### 🔄 The Data Flow
1. **Initialization**: The widget loads on the client's site, injecting the tenant's specific `API Key`.
2. **Conversation**: The user types (or speaks) a message.
3. **Routing**: The widget sends a request to the Tenant/Chat gateway. The API key is validated.
4. **Processing**: The Chat service processes the intent. If the user wants to book a meeting, it queries the Appointment service. If they have a question, it queries the FAQ service.
5. **Response**: The final intelligent response is returned to the widget, rendered instantly, and optionally spoken aloud via TTS.

---

## 🚀 Getting Started

### Local Development

**1. Running the Widget**
```bash
cd chat-widget
npm install
npm run dev
# Open http://localhost:3000 to see the demo widget
```

**2. Building for Production**
```bash
cd chat-widget
npm run build
# Outputs a minified dist/widget.js ready for CDN deployment
```

### Embedding the Widget

Add the following to any HTML page:

```html
<script
  src="https://your-cdn.com/widget.js"
  data-api-key="sk-your-tenant-key"
  data-api-url="https://api.yourdomain.com/chat"
  data-bot-name="Linor Assistant"
  data-primary-color="#6366f1"
  data-welcome-message="Hi! How can I help you today?"
  async
></script>
```

---

## 🛡️ Best Practices & Quality

- **Error Handling**: From network-level exponential backoff in the frontend to graceful 409 Conflict handling in the Appointment API, Linor prioritizes reliability.
- **Security**: API keys are securely hashed and validated. Cross-Origin Resource Sharing (CORS) is strictly enforced per tenant.
- **Performance**: The widget bundle is optimized for minimal impact on the host page's load time (LCP/FID).

---

*Linor — Conversational AI that works for your business.*
