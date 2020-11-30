package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * ピラミッド構造のクラス.
 */
public class Pyramid {
	
	private int id;
	/**	フレームワーク分類ID */
	private Integer frameworkKindId;
	/**	フレームワークID */
	private Integer frameworkId;
	/**	結論 */
	private String conclusion;
	/**	根拠List */
	private List<Reason> rationaleList = new ArrayList<>();
	
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
	 * @return the rationaleList
	 */
	public List<Reason> getRationaleList() {
		return rationaleList;
	}
	/**
	 * @param rationaleList the rationaleList to set
	 */
	public void setRationaleList(List<Reason> rationaleList) {
		this.rationaleList = rationaleList;
	}
}
