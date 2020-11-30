package jp.co.runy.logical_thinking.form;

import javax.validation.constraints.NotEmpty;

public class ExampleForm {
    
    @NotEmpty(message = "入力してください")
    private String explanation;
    private Integer displayOrder;

    /**
     * @return the explanation
     */
    public String getExplanation() {
        return explanation;
    }

    /**
     * @param explanation the explanation to set
     */
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
