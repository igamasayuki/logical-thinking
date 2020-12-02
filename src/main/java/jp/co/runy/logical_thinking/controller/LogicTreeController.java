package jp.co.runy.logical_thinking.controller;

import static jp.co.runy.logical_thinking.util.SessionKeyUtil.SESSION_LOGICTREE_ID_KEY;

import java.util.Objects;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.exception.AjaxValidationFailedException;
import jp.co.runy.logical_thinking.form.LogicTreeForm;
import jp.co.runy.logical_thinking.service.LogicTreeService;
import jp.co.runy.logical_thinking.service.PyramidService;

/**
 * @author takahashikouhei
 *「Step1 全体像を把握する」で使用するコントローラクラス
 */
@Controller
@RequestMapping("/logicalthinking/logictree")
public class LogicTreeController extends AjaxValidationFailedException {
	
	@Autowired
	private LogicTreeService logicTreeService;
	
	@Autowired
	private PyramidService pyramidService;

	private String registeredSessionId = "";
	
	private int registeredLogicTreeId = 0;

	/**
	 * ロジックツリー作成時に使用するフォーム
	 * 
	 * @return LogicTreeForm ロジックツリー作成時に使用するフォーム
	 */
	@ModelAttribute
	public LogicTreeForm getLogicTreeForm() {
		return new LogicTreeForm();
	}
	ObjectMapper mapper = new ObjectMapper();

	/**
	 * 「Step1 全体像を把握する」ページを表示するメソッド.
	 * 
	 * @param model モデルオブジェクト
	 * @return 「Step1 全体像を把握する」ページ
	 */
	@RequestMapping(value = "")
	public String readLogicTree(Model model, HttpSession session) {
		model.addAttribute("frameworkList",logicTreeService.findFramework());
		return "/logicTree/main";
	}

	@ResponseBody
	@GetMapping(value = "/get")
	public ResponseEntity<LogicTree> getLogicTree() {
		LogicTree response = new LogicTree();
		if (Objects.nonNull(registeredSessionId)) {
			response = pyramidService.findLogicTree(registeredLogicTreeId, registeredSessionId);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	/**
	 * ロジックツリーを登録し、登録された主キーを取得するメソッド.
	 * 
	 * @param json jsonデータ
	 * @param session セッションオブジェクト
	 * @return 登録したlogictreeのid
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	@ResponseBody
	@RequestMapping(value ="/api/upsert", method = RequestMethod.POST, produces="text/plain;charset=UTF-8")
	public String upsert(@RequestBody @Valid LogicTree bean, HttpSession session)
			throws JsonMappingException, JsonProcessingException {
		bean.setSessionId(session.getId());
		final int id = logicTreeService.insert(bean);
		session.setAttribute(SESSION_LOGICTREE_ID_KEY, id);
		bean.setId(id);
		registeredSessionId = session.getId();
		registeredLogicTreeId = id;
		return Integer.toString(bean.getId());
	}
}
