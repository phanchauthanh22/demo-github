export type TransactionType = 'Thu' | 'Chi';
export type TransactionCategory = 'Vé' | 'Hàng' | 'Khác';
export type OrderStatus = 'Đã giao' | 'Đang giao' | 'Chờ xử lý';

export interface BaseTransaction {
    key: string;
    code: string; // Mã phiếu
    type: TransactionType; // Loại phiếu (Thu/Chi)
    category: TransactionCategory; // Danh mục
    transactionDate: string; // Ngày giao dịch
    from: string; // Từ (Người nộp/Nhận)
    to: string; // Đến (Người thu/Chi)
    amount: number; // Số tiền
    paymentMethod: string; // Hình thức thanh toán
    trip?: string; // Chuyến (Hà Nội - Sài Gòn 09:00)
    note?: string; // Ghi chú
}

export interface TicketTransaction extends BaseTransaction {
    category: 'Vé';
    ticketCode: string; // Mã vé
    seatType: string; // Loại ghế (Nằm đơn,...)
    bookingDate: string; // Ngày đặt vé
    departureDate: string; // Ngày khởi hành
}

export interface GoodsTransaction extends BaseTransaction {
    category: 'Hàng';
    goodsCode: string; // Mã hàng
    sender: string; // Khách gửi hàng
    receiver: string; // Người nhận
    goodsName: string; // Tên hàng
    sentDate: string; // Ngày gửi hàng
    deliveryDate?: string; // Ngày giao hàng
    status: OrderStatus; // Trạng thái đơn hàng
}

export type Transaction = TicketTransaction | GoodsTransaction;
