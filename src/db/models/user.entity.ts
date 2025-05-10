import { UUID } from 'crypto';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import sequelize from 'sequelize';

export const USER_ROLE = {
  ADMIN: 1,
  ACCOUNTANT: 2,
  VIEWER: 3,
};

@Table({})
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: sequelize.UUIDV4,
  })
  declare id: UUID;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  role: number; // USER_ROLE

  @Column({ type: DataType.STRING, allowNull: false })
  jwt: string;
}

// �� Task: CRUD for "Invoice Management System"
// �� Entities:
// 1. Invoice
// {
// "id": "UUID",
// "invoiceNumber": "INV-2025-001", // auto-generated
// "clientId": "UUID", // FK to Client
// "items": [ // At least 1 item required {
// "description": "string",
// "quantity": "number",
// "unitPrice": "number"
// }
// ],
// "totalAmount": "number", // sum of items (auto-calculated) "status": "draft | sent | paid | overdue", // controlled transitions
// "dueDate": "date",
// "issuedAt": "date",
// "createdBy": "UUID", // FK to User
// "isDeleted": false,
// "createdAt": "date",
// "updatedAt": "date"
// }
// 2. Client
// jsonc
// CopyEdit
// {
// "id": "UUID",
// "name": "string",
// "email": "string",
// "phone": "string",
// "address": "string"
// }
// 3. User
// jsonc
// CopyEdit
// {
// "id": "UUID",
// "name": "string",
// "email": "string",
// "role": "admin | accountant | viewer"
// }
// �� Requirements
// ➕ CREATE:
// ● Create a new invoice:
// ○ Must have at least one item.
// ○ Automatically calculate totalAmount.
// ○ invoiceNumber should be auto-incremented and unique (INV-2025-xxx format).
// �� READ:
// ● Get all invoices with filters:
// ○ status, clientId, createdBy, date range, min/max totalAmount. ● Paginate and sort results by issuedAt, dueDate, status.
// ● Populate client and createdBy details.
// �� UPDATE:
// ● Allow updating invoice only in draft or sent status.
// ● Changing status:
// ○ draft -> sent
// ○ sent -> paid
// ○ sent -> overdue (based on dueDate)
// ● Recalculate totalAmount if items are modified.
// ❌ DELETE:
// ● Soft delete invoices (isDeleted = true).
// ● Prevent deletion if status is paid.
// �� Role-Based Access Control
// ● Admin: Full access to all operations.
// ● Accountant: Can create/update/view but not delete.
// ● Viewer: Read-only access.
// �� Bonus Features
// ● Email the invoice when the status is changed to sent.
// ● Generate a PDF version of the invoice.
// ● Keep a change log (history table for edits with timestamps and user info). ● Export invoices to CSV for reporting.
