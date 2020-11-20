package jp.co.runy.logical_thinking.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.form.LogicTreeForm;
import jp.co.runy.logical_thinking.service.LogicTreeService;

/**
 * @author takahashikouhei
 *「Step1 全体像を把握する」で使用するコントローラクラス
 */
@Controller
@RequestMapping("/logicalthinking/logictree")
public class LogicTreeController {
	@Autowired
	private LogicTreeService logicTreeService;
	@Autowired
	private HttpSession session;
	
	@ModelAttribute
	public LogicTreeForm getLogicTreeForm() {
		return new LogicTreeForm();
	}
	ObjectMapper mapper = new ObjectMapper();
	/**
	 * @param model
	 * @return 「Step1 全体像を把握する」ページ
	 */
	@RequestMapping(value = "")
	public String readLogicTree(Model model) {
		model.addAttribute("frameworkList",logicTreeService.findFramework());
		return "/logicTree/main";
	}
	
	/**
	 * @param json view側(ajax)でjson形式のtextを送信 (本来はLigicTree logicTree で自動的判別にて値を取得したかったがnullになったため, 一旦これで対応)
	 * @param session 使用者判別のセッション情報
	 * @return 登録したlogictreeのid
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	@ResponseBody
	@RequestMapping(value ="/api/upsert", method = RequestMethod.POST, produces="text/plain;charset=UTF-8")
	public String upsert(@RequestBody String json, HttpSession session) throws JsonMappingException, JsonProcessingException {
		LogicTree bean = mapper.readValue(json, LogicTree.class);
		logicTreeService.upsert(bean, session);
		return Integer.toString(bean.getId());
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.POST)
	public String test(@ModelAttribute("logicTreeForm") LogicTreeForm form, Model model, HttpSession session) {
		System.out.println("-------------------------");
		System.out.println(form);
		System.out.println(session.getId());
		return "create";
	}
	
}
