# Fineprint.ai — Product Requirements Document (PRD)

---

## 1. Executive Summary  
Fineprint.ai is an **AI-powered legal document simplification tool** designed to make complex legal contracts, terms & conditions, and other agreements easy to understand for everyday users.  

The product will allow users to:  
- Upload documents (PDF or text)  
- Automatically extract and summarise content in plain English  
- Highlight potential risks  
- Engage in conversational Q&A with the document itself  

**MVP Target:** English-speaking users in the UK, EU, North America, and the Gulf region.  

**Key MVP Features:**  
- Secure user accounts  
- Freemium subscription model  
- Strong privacy safeguards (auto-deletion of unsaved documents after 72 hours)  

---

## 2. Product Vision  

**Vision Statement:**  
Empower everyone to understand legal documents without needing a law degree, reducing the risk of agreeing to unfavourable terms and increasing informed decision-making.  

**Long-Term Goal:**  
Become the global standard for AI-assisted legal document understanding, with advanced compliance checks, AI-powered rewrites, multi-language support, and optional human legal review.  

---

## 3. Target Audience & Personas  

### Primary Audience (MVP):  
- General consumers reviewing personal contracts (e.g., phone contracts, leases)  
- Freelancers reviewing client agreements  
- Small landlords/tenants reviewing lease terms  
- Small business owners reviewing supplier contracts  

### Geographic Focus (MVP):  
- UK, EU, North America, Gulf region (English only)  

### User Personas:  
1. **Sarah — The Freelancer**  
   - Needs quick insights into client contracts before signing  
   - **Pain Points:** Time pressure, lack of legal knowledge  
   - **Goals:** Identify risky clauses, clarify unclear terms  

2. **Tom — The Tenant**  
   - Reviewing a new lease agreement  
   - **Pain Points:** Confusing clauses, hidden obligations  
   - **Goals:** Understand responsibilities and risks before committing  

3. **Aisha — The Small Business Owner**  
   - Needs to check supplier agreements for compliance and penalties  
   - **Pain Points:** Busy schedule, complex legal terms  
   - **Goals:** Identify penalties and ensure compliance  

---

## 4. Problem Statement  
Legal contracts are written in complex, technical language that is hard for non-experts to interpret.  

**Consequences of misunderstanding include:**  
- Unforeseen financial obligations  
- Inability to enforce rights  
- Exposure to penalties and compliance violations  

---

## 5. Solution Overview  
Fineprint.ai will enable users to:  
- Upload or paste legal documents (PDF, scanned PDFs via OCR, text)  
- Receive plain-English summaries and clause-by-clause breakdowns  
- See colour-coded highlights for potential risks (Red = high risk, Yellow = medium risk)  
- Get AI-generated clarifying questions to personalise analysis  
- Chat interactively with their document  
- Download annotated summaries as PDFs  
- Upgrade from freemium tier to premium for unlimited use  

---

## 6. Detailed Feature Requirements  

### 6.1 User Accounts & Authentication  
**Description:** Users can create accounts, log in/out, and manage profiles.  
**User Story:** As a registered user, I want to log into my account so that I can securely access my saved documents and preferences.  
**Acceptance Criteria:**  
- Secure login/signup via Clerk/Supabase  
- Persistent sessions until logout or expiry  
- Profile management (name, email, plan)  
**Priority:** High  

---

### 6.2 Document Upload & Processing  
**Description:** Upload PDF (text or scanned) or paste raw text.  
**User Story:** As a user, I want to upload a legal document so that the system can process and analyse it.  
**Acceptance Criteria:**  
- Support drag-and-drop and file picker  
- OCR for scanned PDFs (Tesseract.js)  
- Auto-detect language (English-only processing in MVP)  
- Error handling for unsupported file types  
**Priority:** High  

---

### 6.3 AI-Powered Summaries  
**Description:** Generate bullet-point and clause-by-clause plain-English summaries.  
**User Story:** As a user, I want a concise summary of my document so that I can understand its key points quickly.  
**Acceptance Criteria:**  
- Summaries appear in <10 seconds  
- Accuracy ≥ 90% in user validation  
- Summaries split into high-level and clause-level sections  
**Priority:** High  

---

### 6.4 Risk & Caveat Highlighting  
**Description:** Identify and colour-code potential risks/obligations.  
**User Story:** As a user, I want risky clauses to be highlighted so that I can focus on the most important sections.  
**Acceptance Criteria:**  
- Red = high risk, Yellow = medium risk  
- User can click to see explanation of risk  
- At least one relevant highlight for risky docs  
**Priority:** High  

---

### 6.5 Relevance Prompting  
**Description:** AI generates personalised clarifying questions.  
**User Story:** As a user, I want AI-generated questions about my document so that I can check whether certain clauses apply to me.  
**Acceptance Criteria:**  
- ≥ 2 relevant questions per flagged section  
- Questions displayed with yes/no or short-answer fields  
**Priority:** High  

---

### 6.6 Basic Compliance Checks  
**Description:** Check for compliance with key consumer protection and privacy laws.  
**User Story:** As a user, I want to know if my document might violate common consumer or privacy laws so that I can take action before signing.  
**Acceptance Criteria:**  
- Identify GDPR, UK Consumer Rights Act, basic CCPA issues  
- Show “Possible Compliance Concern” tag with explanation  
**Priority:** Medium  

---

### 6.7 Chat with Document  
**Description:** Real-time conversational interface with the analysed document.  
**User Story:** As a user, I want to chat with my document so that I can ask specific questions without manually scanning through the text.  
**Acceptance Criteria:**  
- Responses in < 3 seconds for follow-up questions  
- Uses document context for relevant answers  
- Supports follow-up questions without losing context  
**Priority:** High  

---

### 6.8 Export & Save  
**Description:** Download annotated summaries as PDFs, save docs for later (auto-delete after 72h if not saved).  
**User Story:** As a user, I want to download or save my processed document so that I can review it later.  
**Acceptance Criteria:**  
- PDF export with highlights and annotations  
- Saved docs accessible in dashboard  
- Unsaved docs auto-delete after 72h  
**Priority:** Medium  

---

### 6.9 Payments  
**Description:** Subscription-based billing via Stripe.  
**User Story:** As a user, I want to upgrade to premium so that I can process more documents and access all features.  
**Acceptance Criteria:**  
- Freemium tier: Limited docs/month  
- Premium tier: Unlimited processing  
- Secure checkout via Stripe  
- Plan change reflected immediately in UI  
**Priority:** High  

---

### 6.10 Privacy & Security  
**Description:** Ensure confidentiality, encryption, and ethical AI usage.  
**User Story:** As a user, I want assurance that my documents are secure so that I feel confident using the platform.  
**Acceptance Criteria:**  
- HTTPS in transit, AES encryption at rest  
- No training on user data without opt-in  
- Clear data handling policies in T&Cs  
**Priority:** High  

---

## 7. Non-Functional Requirements  
- **Performance:** <10 sec document processing  
- **Scalability:** Serverless-capable backend  
- **Security:** End-to-end encryption, API keys server-side only  
- **Privacy:** Auto-deletion after 72h, GDPR compliant  
- **Accessibility:** Mobile-first responsive UI  
- **Availability:** 99% uptime  

---

## 8. Constraints & Dependencies  
- **Budget:** ~£100 initial budget (free tiers wherever possible)  
- **Language:** English-only at MVP  
- **Third-Party Services:** GPT-5 API, Supabase, Clerk, Stripe, Vercel, Tesseract.js  
- **Limitations:** API cost scaling with high usage  

---

## 9. Release Plan  

**MVP (3–6 weeks):**  
- Core features: Auth, upload, OCR, summaries, highlights, relevance prompts, compliance checks, chat, export, payments  
- Responsive web UI  
- Privacy safeguards  

**Future Features:**  
- Multi-language support  
- Multi-document comparison  
- Jurisdiction-specific compliance checks  
- AI clause rewrites  
- Human legal review  
- Offline/local-only mode  

---

## 10. Open Questions  
- Should Freemium limits be based on documents per month or pages per document?  
- Should we allow in-document annotations?  
- Should chat history persist after document deletion?  

---

## 11. Appendices  

**Legal Disclaimer:** Not a substitute for professional legal advice  
**Data Policy:** 72h auto-deletion, no AI training without consent  

---

## Potential Tech Stack  

### Frontend  
- **Next.js** — React-based framework with SSR & API routes  
- **React** — Component-based UI library  
- **Tailwind CSS** — Utility-first CSS framework  
- **shadcn/ui** — Accessible UI components  

### Backend & API  
- **Node.js** — Backend runtime  
- **Next.js API Routes** — Serverless backend endpoints  
- **Express.js (optional)** — Future standalone backend  
- **Python (FastAPI)** — Microservice for OCR, parsing, NLP pre/post-processing  
- **Tesseract.js** — OCR for scanned PDFs  
- **PyMuPDF / pdfplumber** — PDF extraction & parsing  
- **spaCy** — NLP for clause detection  

### AI & ML  
- **OpenAI GPT-5 API** — Summarisation, risk highlighting, Q&A  
- **OpenAI text-embedding-3-large** — Vector embeddings for chat context  
- **pgvector** — Vector search with PostgreSQL  

### Authentication & User Management  
- **Clerk** — Auth, profiles, sessions  
- **Supabase Auth (optional)** — Alternative auth system  

### Database & Storage  
- **Supabase (PostgreSQL)** — Database with RLS  
- **Supabase Storage** — File storage with signed URLs  
- **AWS S3 (optional)** — Alternative storage  

### Payments & Billing  
- **Stripe** — Subscription management, checkout  

### Hosting & Deployment  
- **Vercel** — Hosting & serverless backend  
- **Railway / AWS Lambda** — Python microservices  
- **GitHub** — Version control  

### Security & Privacy  
- **HTTPS** — Encryption in transit  
- **AES Encryption (Supabase/S3 built-in)** — Encryption at rest  
- **Environment Variables (.env)** — Secure key storage  

### Observability & Analytics  
- **Sentry** — Error tracking  
- **PostHog** — Product analytics  
- **Plausible Analytics** — Privacy-friendly alternative  

### Development Tools  
- **TypeScript** — Type safety  
- **Zod** — Input validation  
- **Vitest / Jest** — Testing  
- **ESLint & Prettier** — Linting & formatting  

---
