package jp.co.runy.logical_thinking.controller;

import static jp.co.runy.logical_thinking.util.SessionKeyUtil.*;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.runy.logical_thinking.domain.Example;
import jp.co.runy.logical_thinking.domain.FirstHierarchy;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.domain.Reason;
import jp.co.runy.logical_thinking.domain.SecondHierarchy;
import jp.co.runy.logical_thinking.domain.ThirdHierarchy;
import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;
import jp.co.runy.logical_thinking.form.MailForm;
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
		LogicTree logicTree = mailService.findLogicTree(session.getId());
		model.addAttribute("logicTree",logicTree);
		
		List<Pyramid> pyramidList = mailService.findPyramid(session.getId());
		model.addAttribute("pyramidList", pyramidList);
		
		List<Reason> reasonList = mailService.findReason(session.getId());
		model.addAttribute("reasonList", reasonList);
		
		List<Example> exampleList = mailService.findExample(session.getId());
		model.addAttribute("exampleList", exampleList);
		
		return "/mail/main";
	}
	
	/**
	 * @param model
	 * @return 「メール文章を編集する」ページ
	 */
	@RequestMapping(value = "/logicalthinking/editMail")
	public String editMail(Model model, HttpSession session) throws SessionTypeConversionExeption {
		System.out.println("ページを開く");
		LogicTree logicTree = mailService.findLogicTree(session.getId());
		model.addAttribute("logicTree",logicTree);
		
		List<Pyramid> pyramidList = mailService.findPyramid(session.getId());
		model.addAttribute("pyramidList", pyramidList);
		
		List<Reason> reasonList = mailService.findReason(session.getId());
		model.addAttribute("reasonList", reasonList);
		
		List<Example> exampleList = mailService.findExample(session.getId());
		model.addAttribute("exampleList", exampleList);
		
		return "/mail/editMail";
	}
	
	/**
	 * @param model
	 * @return 「メール文章を送信する」ページ
	 */
	@RequestMapping(value = "/logicalthinking/sendMail")
	public String sendMail(
			@RequestParam(name = "fromaddress") String str1,
			@RequestParam(name = "toaddress") String str2,
			@RequestParam(name = "title") String str3,
			@RequestParam(name = "mailText") String str4,
			Model model) {
			model.addAttribute("fromaddress", str1);
			model.addAttribute("toaddress", str2);
			model.addAttribute("title", str3);
			model.addAttribute("mailText", str4);
		return "/mail/sendMail";
	}

	

}
