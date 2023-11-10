import { Locale } from "projects/@atlp/services/translation-loader.service";

export const locale: Locale = {
  lang: "ae",
  data: {
REVIEWCART_MAINTITLE: 'المتابعة للدفع',
REVIEWCART_PLEASE_REVIEW_YOUR_CART: 'يرجى مراجعة تفاصيل الدفع',
REVIEWCART_DESCRIPTION:`يرجى مراجعة تفاصيل الدفع الخاصة بك قبل المتابعة للدفع. انقر فوق إلغاء للعودة. انقر فوق دفع للمتابعة للدفع`,
REVIEWCART_TRANSACTION_REFERENCE_NO: 'رقم الطلب',
REVIEWCART_AMOUNT_TO_PAY: 'المبلغ المطلوب',
PAYMENTMETHOD_PLEASESELECTAPAYMENTMETHOD: 'يرجى اختيار طريقة الدفع',
PAYMENTMETHOD_CREDITCART: 'بطاقة ائتمان',
PAYMENTMETHOD_INTERNET_BANKING: 'الدفع عبر الإنترنت',
PAYMENTMETHOD_EWALLET: 'المحفظة الإلكترونية',
PAYMENTMETHOD_ADPAY:'منصة الدفع الرقمي لحكومة أبوظبي',
PAYMENTMETHOD_CASH:'الدفع النقدي',
PAYMENTMETHOD_CHEQUE:'شيك',
PAYMENTMETHOD_APPLEPAY:'ابل باي',
PAYMENTMETHOD_GOOGLEPAY:'جوجل باي',
PAYMENTMETHOD_POSTERMINAL:'محطة نقاط البيع',
PAYMENTMETHOD_PAYMENTTOKENIZATION:'ترميز الدفع',
PAYMENTMETHOD_TOTAL_AMOUNT_TO_PAY:'المبلغ الإجمالي المطلوب', 
PAYMENTMETHOD_SELECTABANK: 'يرجى اختيار البنك',
PAYMENTMETHOD_PAYNOW: 'الدفع الآن',
PAYMENTMETHOD_CANCEL: 'إلغاء',
PAYMENTMETHOD_BANKLIST_ERROR:'خطأ أثناء استرجاع قائمة البنوك، يرجى المحاولة مرة أخرى',
PAYMENT_REVIEW_PROCESSINGFAILED_MESSAGE:'خطأ أثناء عملية الدفع! يرجى المحالو مرة أخرى',
PAYMENTMETHOD_GETPAYMENTRETRIEVAL_FAILED:'خطأ استرجاع طرق الدفع ...! حاول مرة اخرى',
PAYMENTMETHOD_SESSION_EXPIRED:`انتهت الجلسة أو لم تتم مصادقة
                                                          المستخدم`,
PAYMENTMETHOD_CHOOSEPAYMENTMETHOD_TOCONTINUE:'يرجى اختيار طريقة دفع، للمتابعة',
PAYMENTMETHOD_CHOOSEONEBANKTOCONTINUE: 'يرجى اختيار بنك، للمتابعة',
PAYMENTMETHOD_ENTER_CHEQUE_DETAILS: 'يرجى إدخال تفاصيل الشيك',
PAYMENTMETHOD_CHEQUE_NUMBER: 'رقم الشيك',
PAYMENTMETHOD_BANK_NAME: 'اسم البنك',
PAYMENTMETHOD_CHEQUE_DATE: 'تاريخ الشيك',
PAYMENTMETHOD_CHEQUE_AMOUNT: 'قيمة الشيك',
PAYMENTMETHOD_TOTAL_AMOUNT_DUE:'المبلغ الإجمالي المطلوب',
PAYMENTMETHOD_MSG_VALIDATION_ERROR: 'خطأ أثناء التحقق',
PAYMENTMETHOD_MSG_DATA_MISSING: 'لم يتم العثور على بيانات الدفعة',
PAYMENTMETHOD_MSG_INVALID_STATUS: 'بيانات الدفعة تحتوي على حالة دفع خاطئة',
PAYMENTMETHOD_MSG_NO_ITEMS: 'بيانات الدفعة لا تحتوي على عناصر ',
PAYMENTMETHOD_MSG_APPLYCHARGES: 'بيانات الدفعة لا تحتوي على قيمة الرسوم المضافة',
PAYMENTMETHOD_MSG_NO_COLLECTIONTYPE: 'بيانات الدفعة لا تحتوي على قيمة نوع التحصيل',
PAYMENTMETHOD_MSG_NO_ISMOBILE: 'بيانات الدفعة لا تحتوي على قيمة الدفع باستخدام الهاتف الجوال',
PAYMENTMETHOD_MSG_NO_REF_NUMBER: 'بيانات الدفعة ليس لها رقم مرجعي',
PAYMENTMETHOD_MSG_INVALID_AMOUNT: 'المبلغ الإجمالي للدفعة غير صحيح، لا يمكن تسديد دفعة قيمتها صفر',
PAYMENTMETHOD_MSG_ITEM_ERROR: 'هناك معلومات اجبارية في عناصر الدفعة، غير موجودة',
PAYMENTMETHOD_MSG_CHEQUE_NUMBER_ERROR: 'يرجى إدخال رقم الشيك',
PAYMENTMETHOD_MSG_CHEQUE_BANK_NAME: 'يرجى إدخال اسم البنك الصادر منه الشيك',
PAYMENTMETHOD_MSG_CHEQUE_DATE: 'يرجى إدخال تاريخ الشيك',
PAYMENTMETHOD_MSG_CHEQUE_AMOUNT: 'يرجى إدخال قيمة الشيك',
PAYMENTMETHOD_PRODUCTID_INDIVIDUAL: 'الأفراد',
PAYMENTMETHOD_PRODUCTID_CORPORATE: 'الشركات',
PAYMENTMETHOD_MSG_MODAL_PAYMENT: 'معلومات الدفع النموذجية مفقودة',
PAYMENTMETHOD_MSG_GENERATE_ORDERNO: 'بيانات رقم الطلب غير موجودة',
PAYMENTMETHOD_MSG_STANDARD_RECEIPT: 'معلومات الوصل غير موجودة',
PAYMENTMETHOD_MSG_EWALLET_CAPTURE: 'معلومات تفعيل المحفظة الإلكترونية غير موجودة',
PAYMENTMETHOD_MSG_MERCHANT_ID: 'معلومات معرّف التاجر غير موجودة',
PAYMENTMETHOD_MSG_CREATED_BY: 'بيانات جهة إنشاء الطلب غير موجودة',
PAYMENTMETHOD_MSG_TRADE_LICENSE_NUMBER: 'بيانات رقم الرخصة التجارية غير موجودة',
PAYMENTMETHOD_MSG_BENEFICIARY_DETAILS: 'بيانات المستفيد الاجبارية غير موجودة',
PAYMENTMETHOD_MSG_PRODUCTID: 'يرجى اختيار خيار فرد أو شركة، قبل المتابعة للدفع',
PAYMENTMETHOD_MSG_CHEQUE: 'تفاصيل الشيك غير مكتملة، يرجى التحقق قبل المتابعة',
PAYMENTMETHOD_EXTRA_FIXED_CHARGES:'رسوم ثابتة',
PAYMENTMETHOD_EXTRA_PROCESSING_FEE:'رسوم إضافية',
PAYMENTMETHOD_EXTRA_VAT:'ضريبة القيمة المضافة',
PAYMENTMETHOD_EXTRA_SERVICE_CHARGES:'رسوم الخدمة',
PAYMENTMETHOD_EXTRA_MAQTA_VAT:'ضريبة خاصة ببوابة المقطع',

PAYMENT_DIALOG_TITLE:'تفاصيل الدفع',
PAYMENT_DIALOG_SUBTITLE:`قبل أن تغلق ، يمكنك نسخ تفاصيل الدفع الخاصة بك،
                             بالنقر فوق زر النسخ أدناه.`,
PAYMENT_DIALOG_PAYMENT_STATUS:'حالة الدفع',
PAYMENT_DIALOG_SUCCESS:'تم بنجاح',
PAYMENT_DIALOG_FAILED:'حدث خطأ',
PAYMENT_DIALOG_ONLINE_REF_NO:`الرقم المرجعي`,
PAYMENT_DIALOG_AMOUNT_PAID:'المبلغ المدفوع',
PAYMENT_DIALOG_COPY_PAYMENT_DETAILS:'نسخ تفاصيل الدفع',
PAYMENT_DIALOG_CLOSE:'إغلاق',
PAYMENT_DIALOG_COPIED_TO_CLIPBOARD:'تم نسخ تفاصيل الدفع',
PAYMENT_DIALOG_PAYMENT_SUCCESS:'تم الدفع بنجاح',
PAYMENT_DIALOG_PAYMENT_FAILED_MSG:'فشلت عملية الدفع.... يرجى مراجعة مكتب خدمات مجموعة موانئ أبوظبي',    
TIME_OUT_MSG:"الخادم لا يستجيب ، حاول مرة أخرى لاحقًا.",
TOKENIZED_CARD_DELETION_CONFORMATION:"هل أنت متأكد أنك تريد حذف البطاقة؟",
TOKENIZED_CARD_DELETION_SUCCESSFULLY:"تم حذف البطاقة بنجاح",
TOKENIZED_CARD_DELETION_Failed:"فشل حذف البطاقة ، يرجى المحاولة مرة أخرى",
TOKENIZED_VERIFICATION_CODE:"رمز التحقق",
TOKENIZED_CARD_DELETION_VALIDATION:"حدد بطاقة من القائمة",
CASH_PAYMENT_CONFIRMATION_MESSAGE:"يرجى تأكيد استلام الدفعة من العميل؟"
  },
};