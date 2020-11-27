package jp.co.runy.logical_thinking.form;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import jp.co.runy.logical_thinking.domain.Pyramid;

/**
 * @author okazakitatsurou
 * ピラミッド作成時に使用するフォーム
 */
public class PyramidForm extends Pyramid{

    /** フレームワーク分類ID */
    @NotNull
    private Integer frameworkKindId;
    /** フレームワークID */
    
    @NotNull
    private Integer frameworkId;
    /** 結論 */
    @NotEmpty(message="入力してください")
    private String conclusion;
    /** 根拠List */
    private List<@Valid ReasonForm> rationaleFormList = new ArrayList<>();

    /**
     * @return the frameworkKindId
     */
    public Integer getFrameworkKindId() {
        return frameworkKindId;
    }

    /**
     * @param frameworkKindId the frameworkKindId to set
     */
    public void setFrameworkKindId(Integer frameworkKindId) {
        this.frameworkKindId = frameworkKindId;
    }

    /**
     * @return the frameworkId
     */
    public Integer getFrameworkId() {
        return frameworkId;
    }

    /**
     * @param frameworkId the frameworkId to set
     */
    public void setFrameworkId(Integer frameworkId) {
        this.frameworkId = frameworkId;
    }

    /**
     * @return the conclusion
     */
    public String getConclusion() {
        return conclusion;
    }

    /**
     * @param conclusion the conclusion to set
     */
    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    /**
     * @return the rationaleFormList
     */
    public List<ReasonForm> getRationaleFormList() {
        return rationaleFormList;
    }

    /**
     * @param rationaleFormList the rationaleFormList to set
     */
    public void setRationaleFormList(List<ReasonForm> rationaleFormList) {
        this.rationaleFormList = rationaleFormList;
    }
}
