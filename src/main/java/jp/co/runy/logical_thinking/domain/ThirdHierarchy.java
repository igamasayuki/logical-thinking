package jp.co.runy.logical_thinking.domain;

/**
 * @author takahashikouhei
 * ロジックツリーの第三階層を表すクラス.
 */
public class ThirdHierarchy {
	
	private int id;
	private String explanation;
	private Integer secondHierarchyId;
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
	 * @return the secondHierarchyId
	 */
	public Integer getSecondHierarchyId() {
		return secondHierarchyId;
	}
	/**
	 * @param secondHierarchyId the secondHierarchyId to set
	 */
	public void setSecondHierarchyId(Integer secondHierarchyId) {
		this.secondHierarchyId = secondHierarchyId;
	}

	/**
	 * @return the displayOrder
	 */
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	/**
	 * @param displayOrder the displayOrder to set
	 */
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
}
