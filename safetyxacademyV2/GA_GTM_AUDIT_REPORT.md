# Google Analytics & Google Tag Manager Audit Report
**Date:** January 2025  
**Project:** SafetyXAcademy Website

## Executive Summary

Your website currently has **inconsistent tracking implementation**. Only 2 out of 11 HTML pages have Google Analytics installed, and **none of the pages have Google Tag Manager**.

---

## Current Status

### ✅ Pages WITH Google Analytics (GA4)
1. **`aanmelden.html`** - Has GA4 tracking (ID: `G-91JCVXBQ0W`)
2. **`bedankt.html`** - Has GA4 tracking (ID: `G-91JCVXBQ0W`) + conversion event tracking

### ❌ Pages MISSING Google Analytics
1. **`index.html`** - Missing
2. **`jobs.html`** - Missing
3. **`nebosh-opleiding.html`** - Missing
4. **`over-ons.html`** - Missing
5. **`blog/index.html`** - Missing
6. **`blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html`** - Missing
7. **`blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html`** - Missing
8. **`blog/nebosh-vs-mkv.html`** - Missing
9. **`blog/wat-is-nebosh-igc.html`** - Missing

### ❌ Google Tag Manager Status
- **None of the pages have Google Tag Manager installed**

---

## Issues Identified

### 1. **Inconsistent Tracking Coverage**
- Only 18% of pages (2/11) have tracking
- Your homepage (`index.html`) is not tracked, which means you're missing data on your most important entry point
- Blog pages are not tracked, missing valuable content engagement data

### 2. **Missing Google Tag Manager**
- GTM provides more flexibility for managing tracking without code changes
- Easier to add additional tracking tools (Facebook Pixel, LinkedIn Insight, etc.)
- Better for managing conversion events and custom tracking

### 3. **No Centralized Tracking Solution**
- Tracking code is duplicated in individual files
- Makes maintenance difficult
- Risk of inconsistencies if tracking ID changes

---

## Recommendations

### Priority 1: Add Google Analytics to All Pages

**Recommended Approach: Add GA4 to Header Include**

Since you're using a header include (`includes/header.html`), the best solution is to add the Google Analytics code there. This ensures:
- ✅ All pages get tracking automatically
- ✅ Single point of maintenance
- ✅ Consistent implementation

**Implementation:**
Add the GA4 code to `includes/header.html` in the `<head>` section (or create a separate tracking include that's loaded in each page's `<head>`).

### Priority 2: Implement Google Tag Manager

**Why GTM is Recommended:**
1. **Flexibility** - Add/remove tracking without touching code
2. **Multiple Tools** - Manage GA4, Facebook Pixel, LinkedIn, etc. from one place
3. **Event Tracking** - Easier to set up conversion events, scroll tracking, etc.
4. **Testing** - Built-in preview mode for testing before publishing
5. **Version Control** - Track changes and rollback if needed

**Implementation:**
1. Create a GTM container in Google Tag Manager
2. Add GTM container snippet to header include
3. Configure GA4 through GTM (instead of direct implementation)
4. Set up conversion events in GTM

### Priority 3: Enhanced SEO Tracking Setup

**Additional Tracking Recommendations:**

1. **Conversion Events to Track:**
   - Form submissions (`aanmelden.html`)
   - Button clicks (CTA buttons)
   - Scroll depth (engagement metric)
   - Time on page (content engagement)
   - Blog article reads (completion tracking)

2. **E-commerce/Lead Tracking:**
   - Track "Interesse Registratie" as a conversion
   - Track which pages lead to conversions
   - Set up goal funnels in GA4

3. **Content Performance:**
   - Track which blog articles perform best
   - Monitor user journey through site
   - Identify drop-off points

---

## Implementation Guide

### Option A: Quick Fix (Add GA4 to All Pages)

Add this code to each page's `<head>` section (before `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-91JCVXBQ0W"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-91JCVXBQ0W');
</script>
```

**OR** better: Add to a tracking include file and load it in each page.

### Option B: Best Practice (Implement GTM)

1. **Create GTM Container:**
   - Go to https://tagmanager.google.com
   - Create new container
   - Get your GTM container ID (format: `GTM-XXXXXXX`)

2. **Add GTM to Header Include:**
   ```html
   <!-- Google Tag Manager -->
   <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
   <!-- End Google Tag Manager -->
   ```

3. **Add GTM noscript to body:**
   ```html
   <!-- Google Tag Manager (noscript) -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
   <!-- End Google Tag Manager (noscript) -->
   ```

4. **Configure GA4 in GTM:**
   - Add GA4 Configuration tag in GTM
   - Use your existing GA4 ID: `G-91JCVXBQ0W`
   - Set up conversion events as needed

---

## SEO Tracking Best Practices

### 1. **Pageview Tracking**
- ✅ Ensure all pages send pageviews
- ✅ Track virtual pageviews for dynamic content

### 2. **Event Tracking**
- Form submissions
- Button clicks (especially CTAs)
- File downloads
- External link clicks
- Video plays (if applicable)

### 3. **Enhanced Ecommerce/Lead Tracking**
- Track lead generation events
- Set up conversion goals
- Monitor user journey

### 4. **Content Performance**
- Track blog engagement
- Monitor time on page
- Track scroll depth
- Identify top-performing content

### 5. **Technical SEO Monitoring**
- Page load times
- Error tracking (404s, etc.)
- Mobile vs desktop usage
- Browser/device breakdown

---

## Next Steps

1. **Immediate:** Add GA4 to all missing pages (9 pages)
2. **Short-term:** Implement Google Tag Manager
3. **Medium-term:** Set up conversion tracking and events
4. **Ongoing:** Monitor and optimize based on data

---

## Files That Need Updates

### High Priority (Main Pages):
- `index.html`
- `jobs.html`
- `nebosh-opleiding.html`
- `over-ons.html`

### Medium Priority (Blog):
- `blog/index.html`
- `blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html`
- `blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html`
- `blog/nebosh-vs-mkv.html`
- `blog/wat-is-nebosh-igc.html`

---

## Questions to Consider

1. Do you have a Google Tag Manager account? If not, should we set one up?
2. What are your key conversion goals? (Form submissions, button clicks, etc.)
3. Do you need to track any additional tools? (Facebook Pixel, LinkedIn Insight, etc.)
4. Should we implement tracking via header include or individual pages?

---

**Report Generated:** January 2025  
**Tracking ID Found:** `G-91JCVXBQ0W`  
**Total Pages Scanned:** 11  
**Pages with Tracking:** 2 (18%)  
**Pages Missing Tracking:** 9 (82%)








