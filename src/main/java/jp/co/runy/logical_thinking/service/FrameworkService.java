package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.FrameworkElement;
import jp.co.runy.logical_thinking.mapper.FrameworkMapper;

@Service
public class FrameworkService {
	@Autowired
	private FrameworkMapper frameworkMapper;
	
	public List<FrameworkElement> findFrameworkElementById(int id){
		return frameworkMapper.findFrameworkElementById(id);
	}
}
