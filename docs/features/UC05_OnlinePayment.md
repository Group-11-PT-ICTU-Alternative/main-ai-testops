# UC05: Online Payment via Dynamic QR Code

## Use Case Description
Allow students to pay tuition fees online using dynamically generated QR codes with time-based security.

## Business Logic Flow

### 1. QR Code Generation
- Student initiates payment for specific tuition fee
- System generates unique QR code with payment details
- QR code contains: transaction ID, amount, student ID, timestamp
- **TTL: 15 minutes** - QR code expires after 15 minutes

### 2. Redis Storage Strategy
```
Key: qr:payment:{transactionId}
Value: {
  "studentId": "12345",
  "amount": "5000000",
  "currency": "VND",
  "generatedAt": "2024-01-15T10:00:00Z",
  "expiresAt": "2024-01-15T10:15:00Z",
  "status": "PENDING"
}
TTL: 900 seconds (15 minutes)
```

### 3. Payment Processing
1. Student scans QR code with banking app
2. Payment gateway processes transaction
3. System receives payment confirmation
4. Update transaction status to COMPLETED
5. Clear Redis entry for QR code

### 4. Error Handling & Rollback

#### Network Error During Payment:
- **Scenario**: Payment confirmed by bank but network fails to update system
- **Rollback Strategy**:
  1. Log transaction attempt with error details
  2. Set status to PENDING_CONFIRMATION
  3. Implement reconciliation job to verify with payment gateway
  4. Auto-retry mechanism with exponential backoff
  5. Manual verification queue after 3 failed retries

#### QR Code Expired:
- Auto-expire via Redis TTL
- Update database status to EXPIRED
- Notify student to generate new QR code

#### Duplicate Payment:
- Check Redis for existing transaction
- Validate payment status before processing
- Refund mechanism for accidental duplicates

### 5. Security Considerations
- QR code signed with digital signature
- One-time use QR codes
- Rate limiting for QR generation
- IP-based fraud detection
- Amount validation against tuition fee records

### 6. Integration Points
- Payment Gateway API (VietQR, MoMo, ZaloPay)
- Redis for temporary QR storage
- PostgreSQL for permanent transaction records
- Notification Service (SMS, Email, Push)

### 7. Monitoring & Alerts
- Failed payment rate > 5% triggers alert
- QR code generation failures
- Redis connectivity issues
- Payment gateway downtime alerts

## Technical Implementation Notes

### Redis Commands Used:
- `SET qr:payment:{txId} {jsonData} EX 900` - Store with TTL
- `GET qr:payment:{txId}` - Retrieve QR data
- `DEL qr:payment:{txId}` - Manual cleanup
- `EXISTS qr:payment:{txId}` - Check validity

### Database Schema Updates:
```sql
ALTER TABLE payment_transactions ADD COLUMN qr_code_id VARCHAR(255);
ALTER TABLE payment_transactions ADD COLUMN expires_at TIMESTAMP;
ALTER TABLE payment_transactions ADD COLUMN reconciliation_status VARCHAR(50);
```

### API Endpoints:
- `POST /api/payments/qr/generate` - Generate QR code
- `GET /api/payments/qr/status/{transactionId}` - Check QR status
- `POST /api/payments/webhook` - Payment gateway callback
- `GET /api/payments/reconcile` - Manual reconciliation trigger
