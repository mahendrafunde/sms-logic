public with sharing class OpportunityContextInfoApexController3 {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getRecordDetails(String recordId) {
        Map<String, Object> result = new Map<String, Object>();
        String recordType;
        String recordName;
        List<Map<String, String>> relatedRecords = new List<Map<String, String>>();

        // Check if the ID is of Opportunity
        Opportunity opp = [SELECT Id, Name, Account.Name, AccountId FROM Opportunity WHERE Id = :recordId LIMIT 1];
        
        if(opp != null) {
            recordType = 'Opportunity';
            recordName = opp.Name;

            if(opp.AccountId != null) {
                relatedRecords.add(new Map<String, String>{'type' => 'Account', 'name' => opp.Account.Name});
                
                // Fetch Contacts related to the Account associated with this Opportunity
                List<Contact> contacts = [SELECT Id, Name FROM Contact WHERE AccountId = :opp.AccountId];
                for(Contact con : contacts) {
                    relatedRecords.add(new Map<String, String>{'type' => 'Contact', 'name' => con.Name});
                }
            }
        }

        result.put('recordType', recordType);
        result.put('recordName', recordName);
        result.put('relatedRecords', relatedRecords);
        
        return result;
    }
}