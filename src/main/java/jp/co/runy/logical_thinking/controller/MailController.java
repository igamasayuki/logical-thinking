package jp.co.runy.logical_thinking.controller;

import static jp.co.runy.logical_thinking.util.SessionKeyUtil.SESSION_LOGICTREE_ID_KEY;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jp.co.runy.logical_thinking.domain.Example;
import jp.co.runy.logical_thinking.domain.FirstHierarchy;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.domain.Reason;
import jp.co.runy.logical_thinking.domain.SecondHierarchy;
import jp.co.runy.logical_thinking.domain.ThirdHierarchy;
import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;
import jp.co.runy.logical_thinking.service.MailService;
import jp.co.runy.logical_thinking.util.SessionTypeConversion;

/**
 * @author nakagawatomoya
 *「Step3 生成されたメール文章」で使用するコントローラクラス
 */
@Controller
public class MailController {
	
	@Autowired
	private MailService mailService;
	
	/**
	 * セッション取得時の型を変更するクラスオブジェクト.
	 */
	final SessionTypeConversion sessionTypeConversion = new SessionTypeConversion();
	
	/**
	 * @param model
	 * @return 「Step3 生成されたメール文章」ページ
	 */
	@RequestMapping(value = "/logicalthinking/mail")
	public String testMail(Model model, HttpSession session) throws SessionTypeConversionExeption {
		
		final Integer id = sessionTypeConversion.typeConversionStringToInteger(session.getAttribute(SESSION_LOGICTREE_ID_KEY));
		LogicTree logicTree = mailService.findLogicTree(id, session.getId());
		model.addAttribute("logicTree",logicTree);
		
		List<Pyramid> pyramidList = mailService.findPyramid(session.getId());
		model.addAttribute("pyramidList", pyramidList);
		
		List<Reason> reasonList = mailService.findReason(session.getId());
		model.addAttribute("reasonList", reasonList);
		
		List<Example> exampleList = mailService.findExample(session.getId());
		model.addAttribute("exampleList", exampleList);
		
		return "/mail/main";
		
	}

}
