package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.mapper.FrameworkMapper;

@Service
public class FrameworkService {

	@Autowired
	private FrameworkMapper frameworkMapper;
	
	/** 
	 * @param id
	 * @return List<Framework>
	 */
	public List<Framework> findFramework(int id){
		return frameworkMapper.findFramework(id);
	}
}
