# ObjectionRequestCreateView Component

This component renders a responsive and dynamic form for submitting objection requests associated with a list of warnings in the context of an inquiry system.

---

## Features

- Renders a dynamic form per warning
- Upload and remove supporting documents
- Select objection reasons via autocomplete
- Store form progress in `localStorage` with 2-hour expiry
- Responsive layout
- Optimized with `memo`, `useCallback`, and throttled saves
- Validation on final submission
- Works with MUI and custom internal UI components

---

## Props

| Prop              | Type        | Required | Description                                 |
|-------------------|-------------|----------|---------------------------------------------|
| `selectedWarnings`| `any[]`     | ✅        | Array of warning items for form generation  |
| `inquiryId`       | `string`    | ✅        | Inquiry identifier for associating requests |
| `onSuccess`       | `() => void`| ❌        | Callback on successful save                 |
| `onBack`          | `() => void`| ❌        | Callback when user presses back button      |

---

## LocalStorage

Each warning’s objection detail is cached individually under:
```
objection_temp_<inquiryId>_<warningId>
```

- Expiration: 2 hours (`CACHE_TTL`)
- Only updated on throttled input changes (500ms)

---

## Submission Logic

- All required fields must be filled:
  - Document name
  - Objection reason
  - Description
- If invalid, shows error via `MessageHandler`
- On success, clears cache and invokes `onSuccess()`

---

## Developer Notes

- Optimized using `memo`, `useCallback`, `useMemo`
- Custom throttle utility used instead of lodash
- Prevents re-renders using minimal inline functions
- Handles missing values defensively

---

## Related Files

- `ObjectionRequestModel.ts`
- `ObjectionRequestService.ts`
- `ObjectionRequestDetailModel.ts`
- `ObjectionReasonService.ts`
- `InquiryModel.ts`

---

## Testing Tips

- Simulate multiple warnings to verify layout
- Resize viewport to confirm responsiveness
- Test `localStorage` keys and expiration
- Try clearing form manually via UI

---

## License

Internal use only 