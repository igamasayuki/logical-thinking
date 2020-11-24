package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.FrameworkElement;
import jp.co.runy.logical_thinking.mapper.FrameworkElementMapper;

/**
 * @author takahashikouhei
 * フレームワークの要素を操作するサービス
 * ajaxで使用するapi
 */
@Service
public class FrameworkElementService {
	@Autowired
	private FrameworkElementMapper frameworkElementMapper;
	
	
	/** 
	 * @param id
	 * @return List<FrameworkElement>
	 */
	public List<FrameworkElement> findFrameworkElementById(int id){
		return frameworkElementMapper.findFrameworkElementById(id);
	}

}
