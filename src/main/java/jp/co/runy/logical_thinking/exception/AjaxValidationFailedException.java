package jp.co.runy.logical_thinking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author hashimotoshinya
 * Ajax通信でバリデーションエラー発生時のハンドラー
 *
 */
public abstract class AjaxValidationFailedException {

	/**
	 * @param e
	 * @return
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	private String handleException(MethodArgumentNotValidException e) {
		return e.getMessage();
	}

}
