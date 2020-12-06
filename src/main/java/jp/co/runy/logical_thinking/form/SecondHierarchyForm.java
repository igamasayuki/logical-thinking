package jp.co.runy.logical_thinking.form;

import java.util.List;

import jp.co.runy.logical_thinking.domain.ThirdHierarchy;

/**
 * 第二階層フォーム.
 * 
 * @author nonaka
 *
 */
public class SecondHierarchyForm {
	/** ID */
	private int id;
	/** 説明文 */
	private String explanation;
	/** 第一階層ID */
	private Integer firstHierarchyId;
	/**  */
	private Integer displayOrder;
	/** 第三階層リスト */
	private List<ThirdHierarchy> thirdHierarchyList;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	public Integer getFirstHierarchyId() {
		return firstHierarchyId;
	}
	public void setFirstHierarchyId(Integer firstHierarchyId) {
		this.firstHierarchyId = firstHierarchyId;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public List<ThirdHierarchy> getThirdHierarchyList() {
		return thirdHierarchyList;
	}
	public void setThirdHierarchyList(List<ThirdHierarchy> thirdHierarchyList) {
		this.thirdHierarchyList = thirdHierarchyList;
	}
	@Override
	public String toString() {
		return "SecondHierarchyForm [id=" + id + ", explanation=" + explanation + ", firstHierarchyId="
				+ firstHierarchyId + ", displayOrder=" + displayOrder + ", thirdHierarchyList=" + thirdHierarchyList
				+ "]";
	}
}
