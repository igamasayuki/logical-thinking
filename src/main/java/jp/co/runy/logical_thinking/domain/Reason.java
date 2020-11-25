package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * ピラミッド構造の根拠を表すクラス.
 */
public class Reason {
	
	private int id;
	private String word;
	private String explanation;
	private String anotherExplanation;
	private Integer pyramidId;
	private List<Example> evidenceList = new ArrayList<>();
	
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
	 * @return the pyramidId
	 */
	public Integer getPyramidId() {
		return pyramidId;
	}
	/**
	 * @param pyramidId the pyramidId to set
	 */
	public void setPyramidId(Integer pyramidId) {
		this.pyramidId = pyramidId;
	}
	/**
	 * @return the evidenceList
	 */
	public List<Example> getEvidenceList() {
		return evidenceList;
	}
	/**
	 * @param evidenceList the evidenceList to set
	 */
	public void setEvidenceList(List<Example> evidenceList) {
		this.evidenceList = evidenceList;
	}
	
	

}
