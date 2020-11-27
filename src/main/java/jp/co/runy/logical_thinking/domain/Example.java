package jp.co.runy.logical_thinking.domain;

/**
 * @author takahashikouhei
 * 根拠のクラス.
 */
public class Example {
	
	private int id;
	private String explanation;
	private Integer rationaleId;
	private Integer displayOrder;
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
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
	 * @return the rationaleId
	 */
	public Integer getRationaleId() {
		return rationaleId;
	}
	/**
	 * @param rationaleId the rationaleId to set
	 */
	public void setRationaleId(Integer rationaleId) {
		this.rationaleId = rationaleId;
	}

	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	

}
