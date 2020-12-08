package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * ロジックツリーの第二階層を表すクラス.
 */
public class SecondHierarchy {
	private int id;
	private String explanation;
	private Integer firstHierarchyId;
	private Integer displayOrder;
	private List<ThirdHierarchy> thirdHierarchyList;
	
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
	 * @return the firstHierarchyId
	 */
	public Integer getFirstHierarchyId() {
		return firstHierarchyId;
	}
	/**
	 * @param firstHierarchyId the firstHierarchyId to set
	 */
	public void setFirstHierarchyId(Integer firstHierarchyId) {
		this.firstHierarchyId = firstHierarchyId;
	}
	/**
	 * @return the thirdHierarchyList
	 */
	public List<ThirdHierarchy> getThirdHierarchyList() {
		return thirdHierarchyList;
	}
	/**
	 * @param thirdHierarchyList the thirdHierarchyList to set
	 */
	public void setThirdHierarchyList(List<ThirdHierarchy> thirdHierarchyList) {
		this.thirdHierarchyList = thirdHierarchyList;
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
	@Override
	public String toString() {
		return "SecondHierarchy [id=" + id + ", explanation=" + explanation + ", firstHierarchyId=" + firstHierarchyId
				+ ", displayOrder=" + displayOrder + ", thirdHierarchyList=" + thirdHierarchyList + "]";
	}
	
}
