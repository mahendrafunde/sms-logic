import { LightningElement, track, api, wire } from 'lwc';
import getRecordDetails from '@salesforce/apex/RecordContextInfoApexController.getRecordDetails';
import getRecordDetails6 from '@salesforce/apex/RecordContextInfoApexController2.getRecordDetails';
import getRecordDetails7 from '@salesforce/apex/OpportunityContextInfoApexController3.getRecordDetails';

export default class Assignment extends LightningElement {
    @track recordType;
    @track recordName;
    @track relatedRecords = [];
    @api recordId;  // Assuming you'll pass the recordId when placing this component on a record page

    @wire(getRecordDetails, { recordId: '$recordId' })
    wiredRecordDetailsFromController1({ error, data }) {
        if (data) {
            this.recordType = data.recordType;
            this.recordName = data.recordName;
            this.relatedRecords = data.relatedRecords;
        } else if (error) {
            console.error("Error fetching record details:", error);
        }
    }

    @wire(getRecordDetails6, { recordId: '$recordId' })
    wiredRecordDetailsFromController2({ error, data }) {
        if (data) {
            this.recordType = data.recordType;
            this.recordName = data.recordName;
            this.relatedRecords = [...this.relatedRecords, ...data.relatedRecords]; // Merging lists, adjust as needed
        } else if (error) {
            console.error("Error fetching record details:", error);
        }
    }

    @wire(getRecordDetails7, { recordId: '$recordId' })
    wiredRecordDetailsFromController3({ error, data }) {
        if (data) {
            this.recordType = data.recordType;
            this.recordName = data.recordName;
            this.relatedRecords = [...this.relatedRecords, ...data.relatedRecords]; // Merging lists, adjust as needed
        } else if (error) {
            console.error("Error fetching record details:", error);
        }
    }
}
