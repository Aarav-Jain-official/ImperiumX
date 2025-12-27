# ImperiumX
🔧 GearGuard – Smart Maintenance Management System
📌 Project Overview

GearGuard is a workflow-driven maintenance management platform that helps organizations track equipment, manage maintenance teams, and streamline repair workflows from a single dashboard.

It connects three core components:

Equipment – What needs maintenance

Maintenance Teams – Who is responsible

Maintenance Requests – What work must be done

💡 In one line:

A single platform to track assets, assign responsibility, and ensure maintenance is completed on time with full visibility.

⭐ Key Features
Feature	Description
Equipment Registry	Centralized asset database with location, ownership & warranty details
Team Management	Multiple specialized maintenance teams with technicians
Maintenance Requests	Supports both Breakdown (Corrective) and Preventive workflows
Smart Auto-Assignment	Equipment selection auto-fills category & assigned team
Kanban Workflow Board	Drag & drop requests across stages (New → In Progress → Repaired)
Calendar View	Visual scheduling for preventive maintenance
Smart Equipment Actions	View all requests linked to a specific asset
Overdue Alerts	Visual indicators for delayed tasks
Scrap Logic	Mark unusable equipment as scrapped
🛠️ Tech Stack
Architecture Breakdown
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS, Framer Motion
Backend	Node.js, Express.js (REST API)
Database	PostgreSQL
ORM	Prisma
Authentication	JWT
HTTP Client	Axios
Deployment	Vercel (Frontend), Render / Vercel (Backend)
🔄 Core Workflows
1️⃣ Breakdown Maintenance (Corrective)

User raises a maintenance request

Equipment selection auto-assigns:

Category

Maintenance team

Request enters New state

Manager assigns technician

Status moves to In Progress

Technician logs repair duration

Request marked Repaired

2️⃣ Preventive Maintenance (Routine Checkup)

Manager creates a preventive request

Schedules maintenance date

Task appears in Calendar View

Technician completes work on scheduled day

🎨 User Experience Highlights

Interactive Kanban Board with smooth drag & drop

Technician avatars on request cards

Visual overdue task indicators

Calendar-based preventive planning

Smart action buttons with request count badges

🌐 Live Deployment

Frontend:
https://vercel.com/satyansh-mishras-projects/imperium-x-t49d

Backend API:
https://gear-guard-server.onrender.com/
