package jp.co.runy.logical_thinking.form;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

public class ReasonForm {
    
    @NotEmpty(message="入力してください")
    private String word;

    @NotEmpty(message = "入力してください")
    private String explanation;

    @NotEmpty(message = "入力してください")
    private String anotherExplanation;
    private List<@Valid ExampleForm> evidenceFormList = new ArrayList<>();
    private Integer displayOrder;

    /**
     * @return the word
     */
    public String getWord() {
        return word;
    }

    /**
     * @param word the word to set
     */
    public void setWord(String word) {
        this.word = word;
    }

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

    /**
     * @return the anotherExplanation
     */
    public String getAnotherExplanation() {
        return anotherExplanation;
    }

    /**
     * @param anotherExplanation the anotherExplanation to set
     */
    public void setAnotherExplanation(String anotherExplanation) {
        this.anotherExplanation = anotherExplanation;
    }

    /**
     * @return the evidenceFormList
     */
    public List<ExampleForm> getEvidenceFormList() {
        return evidenceFormList;
    }

    /**
     * @param evidenceFormList the evidenceFormList to set
     */
    public void setEvidenceFormList(List<ExampleForm> evidenceFormList) {
        this.evidenceFormList = evidenceFormList;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
