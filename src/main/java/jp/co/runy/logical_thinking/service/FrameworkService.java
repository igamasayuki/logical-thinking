package jp.co.runy.logical_thinking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.mapper.FrameworkMapper;

@Service
public class FrameworkService {
	@Autowired
	private FrameworkMapper frameworkMapper;
	

}
