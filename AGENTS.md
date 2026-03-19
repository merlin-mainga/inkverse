# AGENTS.md - MAINGA Engineering Standards

## Stack
- Next.js 15.2.6 + React 19 + TypeScript
- Prisma 6 + Supabase PostgreSQL
- Cloudinary (media), NextAuth v4 (auth)
- Replicate API (AI primary) + Cloudflare Workers AI (secondary)
- Vercel (deployment)

## CTO Code Review Checklist

### Critical: MUST CHECK Before Every PR

```markdown
## Pre-Push Verification Checklist

### Dependencies
- [ ] All new npm packages added to package.json AND `npm install` run locally
- [ ] New components tested with `npm run build` before push
- [ ] Check package.json diff — verify ALL imports used are from packages listed

### Common Build Failures to Catch
- [ ] Missing npm package (e.g., lucide-react, bcryptjs, etc.)
- [ ] Import typo (wrong package name)
- [ ] Unused import not removed before commit
- [ ] TypeScript type errors
- [ ] Environment variable missing (.env)

### Security
- [ ] Auth check at top of every API route
- [ ] No secrets in code (use env vars)
- [ ] Input validation before DB queries

### Performance
- [ ] No N+1 Prisma queries
- [ ] Select only needed fields (no `select *`)
```

## Nguyên tắc

1. **Luôn build local trước khi push** — `npm run build` phải pass
2. **Dev Engineer phải tự review checklist này** trước khi báo CTO review
3. **CTO review checklist verification** trước khi approve

## Bug History

| Date | Issue | Fix |
|------|-------|-----|
| 2026-03-19 | Homepage 0 manga/users/views - Stats API silent failure returning 200 OK with 0s on DB error | Added retry logic (2 attempts, exponential backoff) + 503 on persistent failure |
| 2026-03-19 | `Module not found: lucide-react` - Dev Engineer thêm import nhưng quên chạy `npm install` | Run `npm install` + commit package.json |

## Error Handling Patterns (CRITICAL)

### NEVER do this in API routes:
```typescript
// ❌ BAD: Returns 200 OK when DB fails, client thinks data is valid
catch (error) {
  return NextResponse.json({ data: null }, { status: 200 });
}
```

### DO this instead:
```typescript
// ✅ GOOD: Return proper error status + retry logic for transient failures
catch (error) {
  // For public endpoints, add retry for cold start issues
  // Return 503 so client knows to retry
  return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
}
```

## Deployment Pipeline

```
Local Dev → npm run build → Git Push → Vercel Build → Deploy
              ↑
         PHẢI PASS TRƯỚC KHI PUSH
```
