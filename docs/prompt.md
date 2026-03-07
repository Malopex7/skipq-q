Build an application called SkipQ.

SkipQ is a South African service platform that helps people avoid standing in long queues at busy locations such as Home Affairs, government departments, clinics, grocery stores, banks, and other high-traffic service points.

The app connects users with “Queue Runners” — trained gig workers who stand in line on behalf of the user. The goal is to save users time, reduce physical congestion at service locations, and create employment.

The system must support three separate user roles:

Client/User: Books a queue runner to stand in line for them.

Runner: Accepts queue jobs, arrives at the location, and waits on the client’s behalf.

Admin: Manages users, runners, jobs, disputes, and pricing.

Core Functional Requirements

For Users (Clients):

Create an account and log in.

Select the service they need (Home Affairs, Licensing Department, Clinic, etc.).

Choose the exact branch/location they want.

See estimated queue times.

Book a runner, including time, date, and service type.

Track the runner’s progress and queue status in real time.

Chat or message the runner.

View job history and receipts.

For Queue Runners:

Create a runner profile.

Receive and accept available queue jobs.

See job details (location, service type, appointment time).

Update status as they queue (Arrived, Waiting, Near Front, Complete).

Communicate with the user.

Track their completed jobs and earnings.

For Admins:

Manage user and runner accounts.

Approve or reject runner applications.

Create and modify service categories and pricing.

Monitor all active queues and jobs.

Resolve disputes or issues between users and runners.

Access analytics for jobs, earnings, and service demand.

Additional Rules & Expectations

The experience should feel like Uber, but for queueing.

The user’s main goal is to avoid standing in long queues.

The runner’s main goal is to provide reliable queue-waiting service.

The admin’s job is operational control, trust, and safety.

The system should feel real-time, reliable, and easy to use.

The app should be optimized for South African locations and service types.




Recommended Documentation Set for SkipQ
1. projectOverview.md

A high-level description of SkipQ:

What the service is

Who it serves

Problem statement and solution

Definitions (Client, Runner, Admin, Queue Request, Task, etc.)

Overall ecosystem description (Client App, Runner App, Admin Panel)

This is the first document anyone new to the project should read.

2. productRequirements.md

All functional requirements from the business perspective:

Features of the Client App

Features of the Runner App

Features of the Admin Dashboard

Queue categories (Home Affairs, Traffic Department, Groceries, etc.)

Real-time updates + expected user flow

Non-functional requirements (performance expectations, latency expectations, SLA targets)

This ensures developers and stakeholders all understand what must be built.

3. userJourneys.md

Step-by-step behaviour from each user type’s perspective:

First-time user onboarding

Client requesting a queue

Matching with runner

Runner accepting job

Live tracking

Task instructions

Payment flow

Dispute resolution

Cancellation, refunds, and no-shows

Maps the entire lifecycle in human language.

4. featureBreakdown.md

A structured, module-by-module decomposition:

Queue Request System

Real-Time Notifications

Runner Tasking Module

Location Tracking Module

ID/Document Upload Module

Review & Rating System

Cancellation/Waiver Logic

Verification & Proof of Completion

Acts as a master reference for developers.

5. roadmap.md

Chronological delivery plan:

Phase 1: Core queue-request MVP

Phase 2: Runner app + live tracking

Phase 3: Admin controls + role management

Phase 4: Payments & compliance

Phase 5: Scaling, optimisation, analytics

Milestones and expected timeframes

This guides the development trajectory.

6. projectPlan.md

Operational breakdown:

Tasks

Dependencies

Responsibilities

Sprint definitions or Kanban workflow

Delivery checkpoints

Integration plan between the 3 apps

This is the master execution document.

7. domainLogic.md

A complete documentation of SkipQ’s operational logic:

Queue matching rules

Runner selection criteria

Queue timing estimation

Penalty logic

Task closure rules

Handling misinformation and queue changes

Proof-of-work logic
Critical for consistent implementation.

8. serviceDescriptions.md

Explanation of each queue service category:

Home Affairs (collections, forms, renewals)

Traffic Department (license renewals, collections)

Groceries (shop-on-behalf, pick-up, delivery-to-door)

Municipal queues

Private hospital queues

This ensures clarity on scope and exclusions.

9. successCriteria.md

Define what “done” means for:

MVP

Full launch

Performance requirements

Reliability expectations

QA acceptance thresholds

Client and Runner satisfaction benchmarks

Prevents scope creep and unclear success measures.

10. UIUXSpecs.md

Not wireframes, but verbal specifications:

Screen-by-screen purpose

User expectations

Behavioural notes (loading states, errors, confirmations)

Accessibility notes

Tone and wording guidelines for UI text

This keeps the UX unified.

11. dataFlowNarrative.md

A written explanation (non-technical) of how information moves:

Client request → runner → admin → completion

Status transitions (Requested, Assigned, En route, Waiting, Completed)

What triggers updates

When notifications fire

Critical for system consistency.

12. operationsManual.md

Documents how the business should run day-to-day:

Admin tasks

Runner onboarding

Runner verification

Handling disputes

Escalations

Queue compliance rules

Operational KPIs

This supports scaling and training future staff.

13. riskRegister.md

List of known risks and mitigations:

Queue unpredictability

Fraud or runner misconduct

Delays

No-shows

Abuse of cancellation policies

Safety of runners

Identity verification issues

Realistic mitigation strategies help keep the operation stable.

14. legalCompliance.md

Business-side compliance guidelines:

What queueing services are allowed

Identification rules

Handling personal information

Privacy expectations

Service-level disclaimers

Limits of liability

Helps avoid future legal issues.

15. testingGuide.md

How SkipQ will be tested:

Scenarios for client app

Scenarios for runner app

Scenarios for admin panel

Key edge cases (queue jumps, incorrect location updates, failed tasks)

Acceptance testing process

Ensures stable delivery.

16. changeLog.md

Tracks all feature changes and revisions.
Useful for long-term maintainability and version control.

17. releaseNotes.md

Document every release’s:

New features

Fixes

Improvements

Known issues

Helpful for non-technical stakeholders.
