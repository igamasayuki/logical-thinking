package jp.co.runy.logical_thinking.controller;

import java.util.List;

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
import jp.co.runy.logical_thinking.service.MailService;

/**
 * @author nakagawatomoya
 *「Step3 生成されたメール文章」で使用するコントローラクラス
 */
@Controller
public class MailController {
	
	@Autowired
	private MailService mailService;
	
	/**
	 * @param model
	 * @return 「Step3 生成されたメール文章」ページ
	 */
	@RequestMapping(value = "/logicalthinking/mail")
	public String testMail(Model model) {
		LogicTree logicTree = mailService.findLogicTree();
		model.addAttribute("logicTree",logicTree);
		
		List<FirstHierarchy> firstHierarchyList = mailService.findFirstHierarchy();
		model.addAttribute("firstHierarchyList", firstHierarchyList);
		
		List<SecondHierarchy> secondHierarchyList = mailService.findSecondHierarchy();
		model.addAttribute("secondHierarchyList", secondHierarchyList);
		
		List<ThirdHierarchy> thirdHierarchyList = mailService.findThirdHierarchy();
		model.addAttribute("thirdHierarchyList", thirdHierarchyList);
		
		List<Pyramid> pyramidList = mailService.findPyramid();
		model.addAttribute("pyramidList", pyramidList);
		
		List<Reason> reasonList = mailService.findReason();
		model.addAttribute("reasonList", reasonList);
		
		List<Example> exampleList = mailService.findExample();
		model.addAttribute("exampleList", exampleList);
		
		return "/mail/main";
		
	}

}
