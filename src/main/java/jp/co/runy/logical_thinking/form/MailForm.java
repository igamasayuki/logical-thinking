package jp.co.runy.logical_thinking.form;

/**
 * @author nakagawatomoya
 *メール編集ページで入力された値を格納するためのフォームクラス
 */
public class MailForm {
	
	private String mailText;

	/**
	 * @return the mailText
	 */
	public String getMailText() {
		return mailText;
	}

	/**
	 * @param mailText the mailText to set
	 */
	public void setMailText(String mailText) {
		this.mailText = mailText;
	}

}
