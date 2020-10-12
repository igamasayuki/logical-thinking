package jp.co.runy.logical_thinking.domain;

/**
 * @author takahashikouhei
 * フレームワークの要素を表すクラス
 */
public class FrameworkElement {
	
	private int id;
	private Integer frameworkId;
	private String element;
	
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
	 * @return the element
	 */
	public String getElement() {
		return element;
	}
	/**
	 * @param element the element to set
	 */
	public void setElement(String element) {
		this.element = element;
	}
	
	

}
