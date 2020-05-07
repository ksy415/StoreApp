package dto;

import java.util.ArrayList;
import java.util.List;

public class TransactionListDto {

    public List<TransactionDto> transactionList;

    public TransactionListDto() {
        this.transactionList = new ArrayList<TransactionDto>();
    }
    public TransactionListDto( List<TransactionDto> transactionDtoList) {
        this.transactionList     = transactionDtoList;
    }

}
