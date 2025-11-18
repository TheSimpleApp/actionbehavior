# 🎨 Vibe Coding Guide - ABC Summit 2025

## What is "Vibe Coding"?

Using AI assistants (Claude Max, Cursor Ultra) to accelerate development through clear, contextual prompts.

---

## 🎯 For This Project

**Your Setup:**
- Claude Max (best for complex logic)
- Cursor Ultra (best autocomplete)
- Supabase (AI-friendly database)
- React Native + Next.js (AI-trained extensively)

**Why It Works:**
- AI models trained heavily on React/TypeScript
- PostgreSQL queries are natural for AI
- shadcn/ui components AI can generate easily
- Clear patterns AI can follow

---

## 💡 Effective Prompting

### Always Include Context
```
Bad: "Create a registration form"

Good: "Create registration form for ABC Summit 2025 conference app.
File: apps/web/app/(public)/register/page.tsx
Tech: Next.js 14, react-hook-form, zod, shadcn/ui, Supabase
Requirements: [list specific fields from contract]"
```

### Reference Requirements
```
"Based on ABC_SUMMIT_2025_REQUIREMENTS.md, create the roommate 
selection component with role-based filtering for all 11 role types."
```

### Break Down Complex Features
```
Instead of: "Build complete roommate system"

Do this:
1. "Create roommate selection UI with dropdowns"
2. "Create role-based filtering logic"
3. "Create pairing algorithm"
4. "Create admin override interface"
```

---

## 🔥 Project-Specific Patterns

### For Data Exports (TOP PRIORITY)
```
"Create CSV export for [data type]:
- Query: [specific Supabase query]
- Fields: [all fields needed]
- Filename: ABC_Summit_2025_[Type]_[Date].csv
- Handle 2,400+ records efficiently
- NO data truncation or loss
- Test with large dataset"
```

### For Roommate Features
```
"Implement roommate pairing logic:
- Role rules from PAIRING_RULES constant
- Handle [specific role type]
- Preserve original selections
- [Specific requirement]"
```

### For Admin Features
```
"Create admin [feature] with:
- Real-time updates (Supabase subscriptions)
- Role-based access (admin only)
- shadcn/ui components
- Error handling
- Success notifications"
```

---

## 🚀 Development Flow

### 1. Read Requirements
Open: `ABC_SUMMIT_2025_REQUIREMENTS.md`  
Identify: Feature to build

### 2. Find Relevant Prompt
Check: `AI_PROMPTS_CHEATSHEET.md`  
Adapt: For specific feature

### 3. Use Cursor/Claude
Paste: Adapted prompt  
Review: Generated code  
Test: Functionality

### 4. Iterate
Ask: "Now add [enhancement]"  
Refine: Until perfect  
Move on: Next feature

---

## ⚡ Quick Wins

Features you can vibe code in < 1 hour:

1. **Event Card Component** (30 min)
2. **CSV Export Button** (45 min)
3. **User Profile Display** (30 min)
4. **Search Functionality** (45 min)
5. **Filter Dropdowns** (30 min)

---

## 🐛 When Stuck

Ask Claude/Cursor:
```
"I'm getting this error: [error message]

In file: [filename]
Code: [paste code]

Context: Building ABC Summit 2025 using [tech stack]
Trying to: [what you're doing]

Help me:
1. Identify the issue
2. Provide solution
3. Explain why it happened"
```

---

## 🎓 Best Practices

### DO:
✅ Provide full context in prompts  
✅ Reference requirement docs  
✅ Test exports immediately  
✅ Verify role-based pairing rules  
✅ Ask for tests alongside code

### DON'T:
❌ Vague prompts without context  
❌ Skip testing data exports  
❌ Forget to specify tech stack  
❌ Build without requirements

---

## 🎯 Focus Areas for This Project

1. **Data Exports** - Test extensively, NO failures allowed
2. **Roommate Algorithm** - Complex logic, get Claude's help
3. **Admin Panel** - Make it intuitive for client
4. **Mobile Polish** - Travel Hub must shine

---

**More details:** `ARCHITECTURE_PLAN.md`, `FINAL_DOCUMENTATION.md`

**Start building:** `START_BUILDING_NOW.md`
