export enum BillType {
    INVOICE,
    BILL,
}

export function getReadableBillType(type: BillType): string {
    switch (type) {
        case BillType.INVOICE:
            return 'invoice';
        case BillType.BILL:
            return 'bill';
        default:
            return 'unrecoginized';
    }
}
