# Browser Testing Checklist

## Device/Browser Matrix

### Desktop (1920px wide)
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Tablet (768px wide, portrait)
- [ ] Chrome mobile
- [ ] Safari iOS
- [ ] Edge mobile

### Mobile (375px wide, portrait)
- [ ] Chrome mobile
- [ ] Safari iOS
- [ ] Edge mobile
- [ ] Test with thumbs-only navigation

### Mobile Landscape (667px wide)
- [ ] Safari iOS landscape
- [ ] Chrome landscape
- [ ] Verify no horizontal scrolling

## Functional Testing

### Landing Page / Age Input
- [ ] Age input field is visible and focused
- [ ] Placeholder text is clear
- [ ] Submit button is obvious and accessible
- [ ] Input accepts valid ages (13-99)
- [ ] Input rejects invalid input (letters, negative numbers, decimals)
- [ ] Error message appears for invalid input
- [ ] Error message clears when correcting input

### Statistics Display
- [ ] Statistics load within 3 seconds of submission
- [ ] Charts/visualizations render smoothly
- [ ] All data points are visible without horizontal scrolling
- [ ] Text is readable (sufficient contrast, 16px+ body text)
- [ ] Charts scale properly on mobile
- [ ] Loading state (spinner/skeleton) appears before data loads

### Responsive Design
- [ ] No content is cut off at any viewport width (320-1920px)
- [ ] Font sizes are readable on mobile (16px minimum for inputs to avoid zoom)
- [ ] Touch targets are thumb-friendly (44px minimum)
- [ ] Margins/padding adjust appropriately for mobile
- [ ] Device rotation works (portrait ↔ landscape)

### Performance
- [ ] Page loads in <3 seconds (test on slow 3G with DevTools throttling)
- [ ] Charts render in <1 second after data is available
- [ ] Animations run smoothly (60fps, no jank)
- [ ] No layout shifts while loading (CLS < 0.1)

### Accessibility (WCAG 2.1 AA)
- [ ] All form inputs have associated labels
- [ ] Focus indicators visible (outline or ring) when tabbing
- [ ] Can navigate entire site with keyboard only (no mouse needed)
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Images have alt text (if applicable)
- [ ] Button text is descriptive (not "Click here")

### Gender Filtering (if implemented)
- [ ] Gender selection doesn't prevent form submission
- [ ] Gender-specific data displays when selected
- [ ] Graceful fallback to general data when gender-specific data unavailable
- [ ] Clearly labels gender-specific vs. general data

## Testing Procedure

1. **Use DevTools** for browser compatibility:
   - Chrome DevTools: Toggle device emulation (Ctrl+Shift+M / Cmd+Shift+M)
   - Firefox: Responsive Design Mode (Ctrl+Shift+M / Cmd+Option+M)
   - Safari: Develop menu → Enter Responsive Design Mode

2. **Test in actual devices** when possible:
   - Borrow phones/tablets from team members
   - Use BrowserStack free tier (limited) or similar service for additional browsers

3. **Performance testing**:
   - Open DevTools Network tab
   - Throttle to "Slow 3G" (DevTools > More tools > Network conditions)
   - Reload and verify <3s load time

4. **Accessibility testing**:
   - Chrome: Install axe DevTools extension
   - Firefox: Install WAVE extension
   - Run automated scans, then manually verify keyboard navigation

## Sign-Off

Tested by: ____________
Date: ____________
All items checked: [ ]
