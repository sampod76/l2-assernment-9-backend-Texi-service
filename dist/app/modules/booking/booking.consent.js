"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOKING_STATUS = exports.BOOKING_FILTERABLE_FIELDS = exports.BOOKING_SEARCHABLE_FIELDS = void 0;
exports.BOOKING_SEARCHABLE_FIELDS = ['userName', 'phoneNumber'];
exports.BOOKING_FILTERABLE_FIELDS = [
    'searchTerm',
    'status',
    'bookingDate',
    'user'
];
exports.BOOKING_STATUS = ['pending', 'accept', 'reject', 'complete', 'cancel'];
