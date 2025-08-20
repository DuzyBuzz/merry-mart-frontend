
export interface Payment {
  paymentId: string;
  status: string;     
  invoiceNo: string; 
  paymentDate: string;   //  "YYYY-MM-DD" format
  bankName: string;     
  checkNo: string;      
  clearingDate: string;  // (YYYY-MM-DD)
  userID: string;        
}
