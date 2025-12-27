# ImperiumX 🔧 GearGuard – Smart Maintenance Management System

GearGuard is a workflow-driven **maintenance management platform** designed to help organizations efficiently track equipment, manage maintenance teams, and streamline repair workflows — all from a single, intuitive dashboard.

---

## 💡 One-liner
**A single platform to track assets, assign responsibilities, and ensure maintenance is completed on time with full visibility.**

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js, Vite  
- Tailwind CSS  
- Framer Motion  

**Backend:**  
- Node.js, Express.js (REST API)  

**Database:**  
- PostgreSQL, Prisma ORM  

**Authentication:**  
- JWT  

**HTTP Client:**  
- Axios  

**Deployment:**  
- Frontend: Vercel  
- Backend: Render / Vercel  

---

## 🔄 Core Workflows

### 1️⃣ Breakdown Maintenance (Corrective)

1. **Request Creation:** User raises a maintenance request.  
2. **Automatic Assignment:** Equipment selection auto-assigns:  
   - Category  
   - Maintenance team  
3. **Request Status Flow:**  
   - Request enters **New** state  
   - Manager assigns a technician  
   - Status moves to **In Progress**  
   - Technician logs repair duration  
   - Request marked as **Repaired**  
4. **Smart Actions:** Action buttons with request count badges for quick updates.  

---

## ✅ Features at a Glance
- Track all equipment and their maintenance history  
- Assign maintenance requests to appropriate teams automatically  
- Real-time status updates and logging  
- Centralized dashboard for managers and technicians  
- Smart UI with actionable request badges  

---

## 🌐 Live Deployment
- **Frontend:** [ImperiumX App](https://imperium-x-t49d.vercel.app/)  
- **Backend API:** [GearGuard Server](https://gear-guard-server.onrender.com/)  

---

